from django.urls import path
from .views import CommentListCreateView, RatingListCreateView, CommentApplicationListCreateView

urlpatterns = [
    path('application/', CommentApplicationListCreateView.as_view()),
    path('comment/', CommentListCreateView.as_view(), name='comment-list-create-view'),
    path('rating/', RatingListCreateView.as_view(), name='raitng-list-create'),
]