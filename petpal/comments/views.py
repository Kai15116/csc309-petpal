from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response

from .models import Comment, Rating
# from applications import Application
from .serializers import CommentSerializer, RatingSerializer
from django.apps import apps
from django.contrib.contenttypes.models import ContentType
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated

from applications.models import Application

from django.contrib.contenttypes.models import ContentType


class CommentListCreateView(ListCreateAPIView):
    """
    get: Returns a paginated list of comments to a respective content_object, currently
    for Application or PetShelter. 
    Comments for Applications are only readable to the Application users. 
    Comments for reviews are only viewable to users logged in.

    post: Creates comment on respective content_object. 
    If commenting on an Application,
    """
    # queryset = Comment.objects.all()
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
            # object_id=object_id_param,
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
            Comment.objects.create(**serializer.validated_data, user=user)


class CommentApplicationListCreateView(ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.filter(object_id=self.request.data.get('object_id'))

    def perform_create(self, serializer):
        # content_object = serializer.validated_data['content_object']
        application = Application.objects.get(id=serializer.validated_data.get('object_id'))
        user = self.request.user

        app_seeker = application.user
        app_shelter = application.pet.owner

        if (user.pk == app_seeker.pk) or (user.pk == app_shelter.pk):
            Comment.objects.create(**serializer.validated_data, user=user,
                                   content_type=ContentType.objects.get_for_model(Application))
        else:
            raise PermissionDenied('Permission Denied: You may only comment on your own applications.')


class RatingListCreateView(ListCreateAPIView):
    serializer_class = RatingSerializer

    def get_queryset(self):
        shelter_wanted = self.request.query_params.get('shelter')
        return Rating.objects.filter(shelter=shelter_wanted)
    
    def perform_create(self, serializer):
        self.serializer_class.is_valid(raise_exception=True)
        user = self.request.user
        Rating.objects.create(**serializer.validated_data, user=user)
