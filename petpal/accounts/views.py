from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from .models import PetSeeker, PetShelter, User
from .serializers import PetSeekerSerializer, PetShelterSerializer, CustomizedTokenObtainSerializer
from rest_framework.response import Response
from rest_framework import permissions
from applications.models import Application
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication

class IsCurrentUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.id != view.kwargs.get('pk'):
            raise PermissionDenied("Permission Denied: You are not allowed to access other people's profile.")
        return True
    
class SeekerProfileGetPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Shelters can only view pet seekers' profiles if they have an active application with the shelter.
        pet_seeker = get_object_or_404(PetSeeker, id=view.kwargs.get('pk'))
        try:
            
            cur_shelter = get_object_or_404(PetShelter, id=request.user.id)
            applications = Application.objects.filter(user=pet_seeker).all()
        except:
            raise PermissionDenied("Permission Denied: Shelters can only view pet seekers' profiles if they have an active application with the shelter.")
        
        if applications:
            for application in applications:
                if application.pet.owner == cur_shelter and (application.status == "pending"):
                    return True
        raise PermissionDenied("Permission Denied: Shelters can only view pet seekers' profiles if they have an active application with the shelter.")
    



# Create your views here.
class CustomizedTokenObtainPairView(TokenObtainPairView):
    """
    post: Login the user with the given username and password credentials.
    400 Bad request will be returned if 
    1). User Does Not Exist.
    2). The password does not match with the username.

    A JWT corresponding to the logged-in user would be returned if authentication succeeds.
    """
    serializer_class = CustomizedTokenObtainSerializer
    
class PetShelterProfilesListCreate(ListCreateAPIView):
    """
    get: Get a list of all shelter profiles with the pet shelter information. 
    Authentication is not required.

    post: Create new pet shelter based on the given information. 
    The required fields includes: username, password, and email
    Errors include: 
    1. Username: A user with that username already exists.
    2. Email: Enter a valid email address.
    3. All: This field may not be blank.
    A 400 Bad request would be returned.
    Authentication is not required for the sign up.
    """
    permission_classes=[AllowAny]
    serializer_class = PetShelterSerializer
    queryset = PetShelter.objects.all()
    

class PetSeekerProfileCreateView(CreateAPIView):
    """
    get: Not allowed. 405 Method Not Allowed

    post: Create new pet seeker based on the given information.
    The required fields includes: username, password, and email
    Errors include: 
    1. Username: A user with that username already exists.
    2. Email: Enter a valid email address.
    3. All: This field may not be blank.
    A 400 Bad request would be returned.
    Authentication is not required for the sign up.
    """
    permission_classes=[AllowAny]
    serializer_class = PetSeekerSerializer
   

class PetShelterProfileRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    """
    get: Pet shelter profile with given ID will be retrieved. Authentication is not required.

    put: Update shelter profile info with given ID based on the given info 
    User is required to be logged in as the current pet shelter account. 

    patch: Partial update shelter profile info with given ID based on the given info of pet shelter.
    User is required to be logged in as the current pet shelter account. 

    delete: Delete pet shelter with the given ID. User are required to be logged in as the current pet shelter account.
    """
    serializer_class = PetShelterSerializer
    permission_classes = [IsAuthenticated, IsCurrentUser]
    queryset = PetShelter.objects.all() 
    
    # def get_object(self):
    #     return get_object_or_404(PetShelter, id=self.kwargs["pk"])

    def get_permissions(self):
        user = self.request.user
        method = self.request.method
        if method == "GET":
            return [AllowAny()]
        else:
            return [IsAuthenticated(), IsCurrentUser()]
        
    def perform_update(self, serializer):
        user = super().perform_update(serializer)
        data = serializer.validated_data
        if "password" in data:
            password = data.pop("password")
            user = self.get_object()
            user.set_password(password)
            return user.save()
        return user
            
        
        

    
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
    """
    get: Pet seeker profile with given ID will be retrieved. 
    User must either be pet seeker himself or pet shelter account that has a pending application with
    the intended pet seeker.

    put: Update seeker profile info with given ID based on the given info 
    User is required to be logged in as the current pet seeker account. 

    patch: Partial update seeker profile info with given ID based on the given info of pet seeker.
    User is required to be logged in as the current pet seeker account. 

    delete: Delete pet seeker with the given ID. User are required to be logged in as the current pet seeker account.
    """
    serializer_class = PetSeekerSerializer
    # permission_classes = []
    queryset = PetSeeker.objects.all()

    def get_permissions(self):
        user = self.request.user
        method = self.request.method
        if method == "GET" and User.is_pet_shelter(user):
            return [IsAuthenticated(), SeekerProfileGetPermission()]
        else:
            return [IsAuthenticated(), IsCurrentUser()]
        
    def perform_update(self, serializer):
        user = super().perform_update(serializer)
        data = serializer.validated_data
        if "password" in data:
            password = data.pop("password")
            user = self.get_object()
            user.set_password(password)
            return user.save()
        return user
        
        
        

    
    # def get_queryset(self):
    #     if self.request.user.is_pet_seeker():
    #         return PetSeeker.objects.filter(id=self.request.user.id)
    #     elif self.request.user.is_pet_shelter():
    #         return PetSeeker.objects.filter(application__pet__owner=self.request.user.petshelter)
    #     else:
    #         raise PermissionDenied()



