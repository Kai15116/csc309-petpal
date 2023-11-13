from rest_framework.exceptions import ValidationError, PermissionDenied
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from .models import Application
from accounts.permissions import IsPetSeekerOrReadOnly

from .serializers import CreateApplicationSerializer, FilterApplicationSerializer, UpdateApplicationSerializer


# Create your views here.

class ListCreateApplicationView(ListCreateAPIView):
    permission_classes = [IsPetSeekerOrReadOnly, IsAuthenticated]
    serializer_class = CreateApplicationSerializer

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
        Application.objects.create(**validated_data, user=pet_seeker)


class RetrieveUpdateApplicationView(RetrieveUpdateAPIView):
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
                raise ValidationError(f'Pet seeker cannot update {old_status} to {new_status}')
            if new_status != 'withdrawn':
                raise ValidationError({'status': f'Pet seeker cannot update {old_status} to {new_status}'})
        elif user.is_pet_shelter():
            if old_status != 'pending':
                raise ValidationError(f'Pet shelter cannot update {old_status} to {new_status}')
            if new_status != 'withdrawn':
                raise ValidationError({'status': f'Pet shelter cannot update {old_status} to {new_status}'})
        else:
            raise PermissionDenied()

        application.status = new_status
        application.save()
