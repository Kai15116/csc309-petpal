from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import PetSeeker, PetShelter, User
from .serializers import PetSeekerSerializer, PetShelterSerializer, CustomizedTokenObtainSerializer
from rest_framework.response import Response

# Create your views here.
class CustomizedTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomizedTokenObtainSerializer
    
    

class PetShelterProfilesListCreate(ListCreateAPIView):
    
    serializer_class = PetShelterSerializer

class PetSeekerProfileCreateView(CreateAPIView):
    serializer_class = PetSeekerSerializer

class PetShelterProfileRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    serializer_class = PetShelterSerializer
    permission_classes = [IsAuthenticated] 
    def get_object(self):
        return get_object_or_404(User, id=self.kwargs["pk"])
    
    def perform_update(self, serializer):
        pet_shelter = get_object_or_404(PetShelter, id=self.kwargs["pk"])
        if self.request.user.id != pet_shelter.id:
            return Response("You are not allowed to update shelters that does not belong to you", status=403)
        return super().perform_update(serializer)
    
    def perform_destroy(self, instance):
        pet_shelter = get_object_or_404(PetShelter, id=self.kwargs["pk"])
        if self.request.user.id != pet_shelter.id:
            return Response("You are not allowed to delete shelters that does not belong to you", status=403)
        return super().perform_destroy(instance)
    
class PetSeekerProfileRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    serializer_class = PetSeekerSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        user = self.request.user
        if not PetSeeker.objects.filter(id=user.id).all():
            return Response("Access Denied 1", status=403)



            

        return super().get_object()


