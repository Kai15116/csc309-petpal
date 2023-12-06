from django.contrib.contenttypes.models import ContentType
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import SAFE_METHODS, IsAuthenticatedOrReadOnly, AllowAny
from .models import Pet, PetType, Breed
from .serializers import PetSerializer, PetSearchSerializer, PetTypeSerializer, BreedSerializer

from accounts.permissions import IsPetShelterOrReadOnly

from drf_yasg.utils import swagger_auto_schema

from notifications.models import Notification

from accounts.models import PetSeeker


# Create your views here.


class ListCreatePetView(ListCreateAPIView):
    """
    get: Searches pets based on various filters and sorting options. Authentication is not required.
    400 Bad Request will be returned when filter options for the query parameters are invalid.
    When filter options are not given, it will return all pets.

    post: Create new pet based on the given details of the pet. User are required to be logged in as pet shelter.
    """
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsPetShelterOrReadOnly]

    @swagger_auto_schema(query_serializer=PetSearchSerializer)
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def perform_create(self, serializer):
        pet = Pet.objects.create(**serializer.validated_data, owner=self.request.user.petshelter)
        serializer.validated_data['id'] = pet.id
        for user in PetSeeker.objects.all():
            Notification.objects.create(
                user=user,
                content_type=ContentType.objects.get_for_model(Pet),
                object_id=pet.id,
                notification_type='new_pet_listing'
            )


    def get_queryset(self):
        serializer = PetSearchSerializer(data=self.request.query_params)
        serializer.is_valid(raise_exception=True)
        order_by = serializer.validated_data.pop('order_by', None)
        name = serializer.validated_data.pop("name", None)

        search_result = Pet.objects.all().filter(**serializer.validated_data)
        if name:
            search_result = search_result.filter(name__icontains=name)
        if order_by:
            search_result = search_result.order_by(order_by)
        return search_result


class RetrieveUpdateDestroyPetView(RetrieveUpdateDestroyAPIView):
    """
    get: Pet with given ID will be retrieved. Authentication is not required.

    put: Update pet with given ID based on the given details of the pet.
    User are required to be logged in as pet shelter. User are required to be the owner of the pet.

    patch: Partial update pet with given ID based on the given details of the pet.
    User are required to be logged in as pet shelter. User are required to be the owner of the pet.

    delete: Delete pet with the given ID. User are required to be logged in as pet shelter.
    User are required to be the owner of the pet.
    """
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsPetShelterOrReadOnly]

    def get_queryset(self):
        if self.request.method in SAFE_METHODS or getattr(self, 'swagger_fake_view', False):
            return Pet.objects.all()
        return Pet.objects.filter(owner=self.request.user.petshelter)


class ListPetTypeView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = PetTypeSerializer
    queryset = PetType.objects.all()


class ListBreadView(ListAPIView):
    serializer_class = BreedSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Breed.objects.filter(pet_type=self.kwargs["pk"])

