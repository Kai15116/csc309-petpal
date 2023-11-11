from django.urls import path
from . import views

app_name = "applications"
urlpatterns = [
    path('', views.ListCreateApplicationView.as_view()),
    path('<int:pk>/', views.RetrieveUpdateApplicationView.as_view()),
]
