from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from .views import NotificationCreate, NotificationUpdate, NotificationList, NotificationDelete, NotificationGet

app_name = "notifications"
urlpatterns = [
    path('create/', NotificationCreate.as_view()),
    path('update/', NotificationUpdate.as_view()),
    path('list/', NotificationList.as_view()),
    path('delete/', NotificationDelete.as_view()),
    path('get/', NotificationGet.as_view())
]
