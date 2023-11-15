from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from .models import Comment, Rating
from .serializers import CommentSerializer, RatingSerializer
from django.apps import apps
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.permissions import IsAuthenticated
from applications.models import Application
from django.contrib.contenttypes.models import ContentType
from accounts.models import User, PetShelter
from django.http import Http404

class CommentListCreateView(ListCreateAPIView):
    """
    get: Returns a paginated list of comments to a respective content_object, currently
    for Application or PetShelter.

    post: Creates comment on respective content_object.
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
    """
    get: Returns paginated list of comments for an Application given the
    object_id (primary key) of the Application. Orders by creation date.

    post: Create comment on an Application. Ensures that the User who
    wishes to comment is part of the Application, whether that be a
    Seeker or Shelter of the Application. Verifies that comment replies cannot be
    directed across models (e.g. Cannot reply to Application when on PetShelter,
    Cannot reply to Application from a different Application).
    """
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        object_id = self.request.data.get('object_id')
        if not object_id:
            raise ValidationError({"object_id": "This field is required."})
        return Comment.objects.filter(object_id=self.request.data.get('object_id'),
                content_type=ContentType.objects.get_for_model(Application)).order_by('-created_at')

    def perform_create(self, serializer):
        
        user = self.request.user
        try:
            application = Application.objects.get(id=serializer.validated_data.get('object_id'))
            reply_to = serializer.validated_data.get('reply_to')
            if reply_to and reply_to.content_type != ContentType.objects.get_for_model(Application):
                raise ValidationError({'reply_to': 'You have to reply to the comment of same type.'})
            if reply_to and reply_to.object_id != serializer.validated_data.get('object_id'):
                raise ValidationError({'reply_to': 'You have to reply to the comment that corresponds to the same object.'})

            app_seeker = application.user
            app_shelter = application.pet.owner

            if (user.pk == app_seeker.pk) or (user.pk == app_shelter.pk):
                Comment.objects.create(**serializer.validated_data, user=user,
                                    content_type=ContentType.objects.get_for_model(Application))
            else:
                raise PermissionDenied('Permission Denied: You may only comment on your own applications.')
            
        except Application.DoesNotExist:
            raise Http404('Application does not exist.')


class PetShelterCommentListCreateView(ListCreateAPIView):
    """
    get: Returns paginated list of comments for a PetShelter given the
    object_id (primary key) of the PetShelter. Orders by creation date.

    put: Create comment on PetShelter. Verifies that comment replies cannot be
    directed across models (e.g. Cannot reply to Application when on PetShelter,
    Cannot reply to Application from a different Application).
    """
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        object_id = self.request.data.get('object_id')
        if not object_id:
            raise ValidationError({"object_id": "This field is required."})
        return Comment.objects.filter(object_id=self.request.data.get('object_id'),
                content_type=ContentType.objects.get_for_model(PetShelter)).order_by('-created_at')

    def perform_create(self, serializer):
        user = self.request.user
        reply_to = serializer.validated_data.get('reply_to')
        object_id = self.request.data.get('object_id')

        try: 
            if User.objects.get(id=object_id).is_pet_seeker():
                raise ValidationError({'object_id': 'Expected object_id to refer to a shelter.'})
            if reply_to and reply_to.content_type != ContentType.objects.get_for_model(PetShelter):
                raise ValidationError({'reply_to': 'You have to reply to the comment of same type.'})
            if reply_to and reply_to.object_id != serializer.validated_data.get('object_id'):
                raise ValidationError({'reply_to': 'You have to reply to the comment that corresponds to the same object.'})

            Comment.objects.create(**serializer.validated_data, user=user,
                                content_type=ContentType.objects.get_for_model(PetShelter))
        except User.DoesNotExist:
            raise Http404('User does not exist.')


class CommentRetrieveView(RetrieveAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get(self):
        comment_id = self.kwargs.get('pk')

        try:
            comment = Comment.objects.get(pk=comment_id)
            return comment
        except Comment.DoesNotExist:
            raise Http404('Comment does not exist.')
        
        

class RatingListCreateView(ListCreateAPIView):
    """
    get: Returns all the ratings for a given shelter.

    post: Create rating for a PetShelter from a User.
    """
    serializer_class = RatingSerializer

    def get_queryset(self):
        shelter = self.request.data.get('shelter')
        if not shelter:
            raise ValidationError({"shelter": "This field is required."})
        return Rating.objects.filter(shelter=shelter)

    def perform_create(self, serializer):
        user = self.request.user
        Rating.objects.create(**serializer.validated_data, user=user)
