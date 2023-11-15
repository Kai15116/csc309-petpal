from django.urls import path
from .views import CommentListCreateView, RatingListCreateView

urlpatterns = [
    path('comment/<int:pk>', CommentListCreateView.as_view(), name='comment-list-create-view'),
    path('rating/', RatingListCreateView.as_view(), name='raitng-list-create'),
]