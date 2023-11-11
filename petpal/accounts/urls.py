from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from .views import PetShelterProfilesListCreate, CustomizedTokenObtainPairView

app_name = "accounts"
urlpatterns = [
    # Taken from Lecture 10 Example code
    path('token/', CustomizedTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('shelter/', PetShelterProfilesListCreate.as_view()),
    # path('shelter/<int:pk>/'),
    # path('seeker/'),
    # path('seeker/<int:pk>/'),
]
