from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.permissions import IsAdminUser
from .models import PetSeeker, PetShelter
from .serializers import PetSeekerSerializer, PetShelterSerializer, CustomizedTokenObtainSerializer

# Create your views here.
class CustomizedTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomizedTokenObtainSerializer
class PetShelterProfilesListCreate(ListCreateAPIView):
    serializer_class = PetShelter


