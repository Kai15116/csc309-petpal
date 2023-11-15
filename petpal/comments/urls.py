from django.urls import path
from .views import CommentListCreateView, RatingListCreateView, CommentApplicationListCreateView, PetShelterCommentListCreateView, CommentRetrieveView

urlpatterns = [
    path('application/', CommentApplicationListCreateView.as_view(), name='application-comment-list-create-view'),
    path('shelter/', PetShelterCommentListCreateView.as_view(), name='shelter-comment-list-create-view'),
    path('rating/', RatingListCreateView.as_view(), name='rating-list-create'),
    path('<int:pk>/', CommentRetrieveView.as_view(), name='comment-retrieve-view'),
]