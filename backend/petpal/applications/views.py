from rest_framework.exceptions import ValidationError, PermissionDenied
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema

from .models import Application
from accounts.permissions import IsPetSeekerOrReadOnly

from .serializers import CreateApplicationSerializer, FilterApplicationSerializer, UpdateApplicationSerializer

# Create your views here.


class ListCreateApplicationView(ListCreateAPIView):
    """
    get: If user is logged in as pet shelter, it will return a list of applications sent to the pet that user owns.
    If user is logged in as pet seeker, it will return all the applications that pet seeker sent.
    User are required to be logged in.
    You can provide query parameters to filter applications by status and sort by creation time or last update time.
    If no query parameter is provided it will not apply any filter.

    post: Creates application based on the given details about the application.
    User can only create application for a pet listing that is "available".
    User is required to be logged in as a pet seeker.
    """
    permission_classes = [IsPetSeekerOrReadOnly, IsAuthenticated]
    serializer_class = CreateApplicationSerializer

    @swagger_auto_schema(query_serializer=FilterApplicationSerializer)
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        result = Application.objects.all()
        serializer = FilterApplicationSerializer(data=self.request.query_params)
        serializer.is_valid(raise_exception=True)
        order_by = serializer.validated_data.pop('order_by', None)

        if self.request.user.is_pet_seeker():
            result = result.filter(user=self.request.user.petseeker)
        elif self.request.user.is_pet_shelter():
            result = result.filter(pet__owner=self.request.user.petshelter)
        else:
            raise PermissionDenied()

        result = result.filter(**serializer.validated_data)
        if order_by:
            result = result.order_by(order_by)
        return result

    def perform_create(self, serializer):
        validated_data = serializer.validated_data
        pet_seeker = self.request.user.petseeker
        pet = validated_data.get('pet')

        if pet.status != 'available':
            raise ValidationError({'pet': 'The pet you specified isn\'t available.'})
        application = Application.objects.create(**validated_data, user=pet_seeker)
        serializer.validated_data['id'] = application.id


class RetrieveUpdateApplicationView(RetrieveUpdateAPIView):
    """
    get: Retrieves application with the given ID. User is required to be logged in either as pet seeker or pet shelter.
    Pet seeker can only retrieve application that they sent and pet shelter can only retrieve application that they received.

    put: Updates application with the given ID. User is required to be logged in either as pet seeker or pet shelter.
    - Shelter can only update the status of an application from pending to accepted or denied.
    - Pet seeker can only update the status of an application from pending or accepted to withdrawn.

    Pet seeker can only update application that they sent and pet shelter can only update application that they received.

    Note\: there are no difference between put and patch because we only have 1 required field.

    patch: Do partial update on the application with the given ID.
    User is required to be logged in either as pet seeker or pet shelter.
    - Shelter can only update the status of an application from pending to accepted or denied.
    - Pet seeker can only update the status of an application from pending or accepted to withdrawn.

    Pet seeker can only update application that they sent and pet shelter can only update application that they received.

    Note\: there are no difference between put and patch because we only have 1 required field.
    """
    serializer_class = UpdateApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        result = Application.objects.all()
        if self.request.user.is_pet_seeker():
            return result.filter(user=self.request.user.petseeker)
        elif self.request.user.is_pet_shelter():
            return result.filter(pet__owner=self.request.user.petshelter)
        else:
            raise PermissionDenied()

    def perform_update(self, serializer):
        validated_data = serializer.validated_data
        new_status = validated_data.get('status')
        application = self.get_object()
        old_status = application.status
        user = self.request.user

        if user.is_pet_seeker():
            if old_status not in {'pending', 'accepted'}:
                raise ValidationError({'status': f'Pet seeker cannot update {old_status} to {new_status}'})
            if new_status != 'withdrawn':
                raise ValidationError({'status': f'Pet seeker cannot update {old_status} to {new_status}'})
        elif user.is_pet_shelter():
            if old_status != 'pending':
                raise ValidationError({'status': f'Pet shelter cannot update {old_status} to {new_status}'})
            if new_status not in {'accepted', 'denied'}:
                raise ValidationError({'status': f'Pet shelter cannot update {old_status} to {new_status}'})
        else:
            raise PermissionDenied()

        application.status = new_status
        application.save()
