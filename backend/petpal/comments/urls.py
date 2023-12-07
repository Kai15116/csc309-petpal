from django.urls import path
from .views import RatingRetrieveView, CommentListCreateView, RatingListCreateView, CommentApplicationListCreateView, PetShelterCommentListCreateView, CommentRetrieveView

app_name = 'comments'
urlpatterns = [
    path('application/<int:object_id>/', CommentApplicationListCreateView.as_view(), name='application-comment-list-create-view'),
    path('shelter/<int:object_id>/', PetShelterCommentListCreateView.as_view(), name='shelter-comment-list-create-view'),
    path('rating/', RatingListCreateView.as_view(), name='rating-list-create'),
    path('rating/<int:shelter>/<int:user>', RatingRetrieveView.as_view(), name='rating-retrieve-view'),
    path('<int:pk>/', CommentRetrieveView.as_view(), name='comment-retrieve-view'),
]