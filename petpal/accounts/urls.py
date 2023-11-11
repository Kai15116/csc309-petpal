from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from .views import PetShelterProfilesListCreate, PetShelterProfileRetrieveUpdateDestroy,\
PetSeekerProfileCreateView, CustomizedTokenObtainPairView

app_name = "accounts"
urlpatterns = [
    # Taken from Lecture 10 Example code

    path('token/', CustomizedTokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('shelter/', PetShelterProfilesListCreate.as_view()),
    path('shelter/<int:pk>/', PetShelterProfileRetrieveUpdateDestroy.as_view()),
    path('seeker/', PetSeekerProfileCreateView.as_view()),
    # path('seeker/<int:pk>/'),
]
