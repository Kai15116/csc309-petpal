from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from .models import Comment
from .serializers import CommentSerializer
from django.apps import apps
from django.contrib.contenttypes.models import ContentType


class CommentListCreateViewReviews(ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        content_type_id = self.request.data.get('content_type')
        object_id = self.request.data.get('object_id')
        self.serializer_class.is_valid(raise_exception=True)
        
        if isinstance(content_type_id, ('accounts', 'PetShelter')):
            return Comment.objects.filter(content_type__model='PetShelter', object_id=object_id)
        if isinstance(content_type_id, ('applications', 'Application')):
            return Comment.objects.filter(content_type__model='Application', object_id=object_id)
        
    def perform_create(self, serializer):
        content_type_id = self.request.data.get('content_type')
        object_id = self.request.data.get('object_id')

        Comment.objects.create(**serializer.validated_data)
        serializer.save(user=self.request.user, content_type__model='User', )

class CommentListCreateViewChat(ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        return super().get_queryset()
    
    def perform_create(self, serializer):
        return super().perform_create(serializer)