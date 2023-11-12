from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import PetSeeker, PetShelter, User
from .serializers import PetSeekerSerializer, PetShelterSerializer, CustomizedTokenObtainSerializer
from rest_framework.response import Response
from rest_framework import permissions
from applications.models import Application
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied
from django.shortcuts import get_object_or_404

class IsCurrentUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.id != view.kwargs.get('pk'):
            raise PermissionDenied("Permission Denied: You are not allowed to access other people's profile.")
        return True
    
class SeekerProfileGetPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Shelters can only view pet seekers' profiles if they have an active application with the shelter.
        pet_seeker = get_object_or_404(PetSeeker, id=view.kwargs.get('pk'))
        cur_shelter = get_object_or_404(PetShelter, id=request.user.id)
        applications = Application.objects.filter(user=pet_seeker).all()
        if applications:
            for application in applications:
                if application.pet.owner == cur_shelter and (application.status != "accepted" or application.status != "withdrawn"):
                    return True
        raise PermissionDenied("Permission Denied: Shelters can only view pet seekers' profiles if they have an active application with the shelter.")
    



# Create your views here.
class CustomizedTokenObtainPairView(TokenObtainPairView):
    
    serializer_class = CustomizedTokenObtainSerializer
    
    

class PetShelterProfilesListCreate(ListCreateAPIView):
    permission_classes=[]
    
    serializer_class = PetShelterSerializer
    queryset = PetShelter.objects.all()
    

 

    

class PetSeekerProfileCreateView(CreateAPIView):
    permission_classes=[]
    serializer_class = PetSeekerSerializer
   

class PetShelterProfileRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    serializer_class = PetShelterSerializer
    permission_classes = [] 
    
    def get_object(self):
        return get_object_or_404(PetShelter, id=self.kwargs["pk"])
    
    # def perform_update(self, serializer):
    #     pet_shelter = get_object_or_404(PetShelter, id=self.kwargs["pk"])
    #     if self.request.user.id != pet_shelter.id:
    #         return Response("You are not allowed to update shelters that does not belong to you", status=403)
    #     return super().perform_update(serializer)
    
    # def perform_destroy(self, instance):
    #     pet_shelter = get_object_or_404(PetShelter, id=self.kwargs["pk"])
    #     if self.request.user.id != pet_shelter.id:
    #         return Response("You are not allowed to delete shelters that does not belong to you", status=403)
       
    #     return super().perform_destroy(instance)
    
class PetSeekerProfileRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    serializer_class = PetSeekerSerializer
    # permission_classes = []
    queryset = PetSeeker.objects.all()

    def get_permissions(self):
        user = self.request.user
        method = self.request.method
        if method == "GET":
            return [SeekerProfileGetPermission]
        
        
        

    
    # def get_queryset(self):
    #     if self.request.user.is_pet_seeker():
    #         return PetSeeker.objects.filter(id=self.request.user.id)
    #     elif self.request.user.is_pet_shelter():
    #         return PetSeeker.objects.filter(application__pet__owner=self.request.user.petshelter)
    #     else:
    #         raise PermissionDenied()



