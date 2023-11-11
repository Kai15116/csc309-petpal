from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, get_object_or_404, ListAPIView
from rest_framework.permissions import SAFE_METHODS
from .models import Pet
from .serializers import PetSerializer, PetSearchSerializer

from accounts.permissions import IsPetShelterOrReadOnly

# Create your views here.


class ListCreatePetView(ListCreateAPIView):
    serializer_class = PetSerializer
    permission_classes = [IsPetShelterOrReadOnly]

    def perform_create(self, serializer):
        Pet.objects.create(**serializer.validated_data, owner=self.request.user.petshelter)

    def get_queryset(self):
        serializer = PetSearchSerializer(data=self.request.query_params)
        serializer.is_valid(raise_exception=True)
        return Pet.objects.all().filter(**serializer.validated_data)


class RetrieveUpdateDestroyPetView(RetrieveUpdateDestroyAPIView):
    serializer_class = PetSerializer

    def get_queryset(self):
        if self.request.method in SAFE_METHODS:
            return Pet.objects.all()
        return Pet.objects.filter(owner=self.request.user)
