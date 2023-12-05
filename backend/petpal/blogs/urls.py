from django.urls import path
from . import views

app_name = "blogs"
urlpatterns = [
    path('', views.ListCreateBlogView.as_view()),
    path('<int:pk>/', views.RetrieveUpdateDestroyBlogView.as_view(), name="with_id"),
]
