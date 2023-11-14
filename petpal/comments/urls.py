from django.urls import path
from .views import CommentListCreateViewReviews, CommentListCreateViewChat

urlpatterns = [
    path('petshelter/<int:pk>/comments/', CommentListCreateViewReviews.as_view(), name='comment-list-create-reviews'),
    path('applications/<int:pk>/comments/', CommentListCreateViewChat.as_view(), name='comment-list-create-chat'),
]