from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from .views import NotificationListCreate, NotificationRetrieveDestroy

app_name = "notifications"
urlpatterns = [
    path('', NotificationListCreate.as_view()),
    path('<int:pk>/', NotificationRetrieveDestroy.as_view()),
]
