from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Comment
from .serializers import CommentSerializer

class CommentListCreateView(ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        # Assuming your shelter detail view provides the shelter ID as a parameter
        shelter_id = self.kwargs['shelter_id']
        return Comment.objects.filter(content_type__model='petshelter', object_id=shelter_id)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, content_type__model='petshelter', object_id=self.kwargs['shelter_id'])

class CommentDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

