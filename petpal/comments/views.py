from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from .models import Comment
from applications import Application
from .serializers import CommentSerializer, RatingSerializer
from django.apps import apps
from django.contrib.contenttypes.models import ContentType
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated


class CommentListCreateView(ListCreateAPIView):
    """
    get: Returns a paginated list of comments to a respective content_object, currently
    for Application or PetShelter. 
    Comments for Applications are only readable to the Application users. 
    Comments for reviews are only viewable to users logged in.

    post: Creates comment on respective content_object. 
    If commenting on an Application, 


    """
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        content_type_model_mapping = {
            'application': apps.get_model('applications', 'Application'),
            'petshelter': apps.get_model('accounts', 'PetShelter'),
        }

        content_type_param = self.request.query_params.get('content_type', '').lower()
        object_id_param = self.request.query_params.get('object_id')

        if content_type_param not in content_type_model_mapping:
            return Comment.objects.none()

        # content_object_model = content_type_model_mapping[content_type_param]

        return Comment.objects.filter(
            content_type__model=content_type_param,
            object_id=object_id_param,
        )

    def perform_create(self, serializer):
        self.serializer_class.is_valid(raise_exception=True)

        content_object = serializer.validated_data['content_object']
        user = self.request.user
        
        if isinstance(content_object, apps.get_model('applications', 'Application')):
            app_seeker = content_object.user
            app_shelter = content_object.pet.owner

            if (user.pk == app_seeker.pk) or (user.pk == app_shelter.pk):
                Comment.objects.create(**serializer.validated_data)
            else:
                raise PermissionDenied('Permission Denied: You may only comment on your own applications.')
            
        elif isinstance(content_object, apps.get_model('accounts', 'PetShelter')):
            Comment.objects.create(**serializer.validated_data)

        

class RatingListCreateView(ListCreateAPIView):
    serializer_class = RatingSerializer

    def get_queryset(self):
        return super().get_queryset()
    
    def perform_create(self, serializer):
        return super().perform_create(serializer)