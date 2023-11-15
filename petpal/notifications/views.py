from rest_framework.permissions import IsAuthenticated

from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.generics import ListCreateAPIView,  RetrieveDestroyAPIView
from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

read_param = openapi.Parameter('read', openapi.IN_QUERY, description="Read attribute used to filter.", type=openapi.TYPE_BOOLEAN)


class NotificationListCreate(ListCreateAPIView):
    """
    get: Retrieve a list of notifications for the authenticated user with filtering.
    - Users (shelter and seeker) can only view their own notifications.
    - User can filter notifications by read/unread to get all unread notifications.
    - It is sorted by creation time in descending order (latest first).

    post:
    Create a new notification based on the provided data. The notification type and user association
    are determined by the type of user and the type of content object involved.
    - If the user is a PetSeeker and the content type represents an Application, it creates a status update notification.
    - If the user is a PetShelter and the content type represents an Application, it creates an application creation notification.
    - If the user is a PetShelter and the content type represents a Comment, and the comment is made on Shelter, it creates a new review notification.
    - If the content type represents a Comment and comment was made on an Application, it creates a new message notification.
    - If the content type represents a Pet, it creates a new pet listing notification.
    """
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(manual_parameters=[read_param])
    def get(self, request):
        return super().get(request)

    def get_queryset(self):
        result = Notification.objects.filter(user=self.request.user)
        read = self.request.query_params.get('read')
        if read is not None:
            result = result.filter(read=read)
        return result

    def perform_create(self, serializer):
        content_type = serializer.validated_data.get('content_type')
        object_id = serializer.validated_data.get('object_id')
        try:
            content_object = content_type.get_object_for_this_type(id=object_id)
        except:
            raise Http404

        user = self.request.user

        # if user is PetSeeker AND content_object refers to Application => status update notification
        if user.is_pet_seeker() and content_type.model == 'application':
            notification_type = 'status_update'
        
        # if user is PetShelter AND content_object refers to Application => application creation notification
        elif user.is_pet_shelter() and content_type.model == 'application':
            notification_type = 'application_creation'

        # if user is PetShelter AND content_object refers to Comment AND comment.content_object refers to Shelter
        elif (user.is_pet_shelter() and content_type.model == 'comment'
              and content_object.content_type.model == 'petshelter'):
            notification_type = 'new_review'

        # if content_object refers to Comment AND comment.content_object refers to Application => new message notification
        elif content_type.model == 'comment' and content_object.content_type.model == 'application':
            notification_type = 'new_message'

        # if content_object refers to Pet => new pet listing notification
        elif content_type.model == 'pet':
            notification_type = 'new_pet_listing'
        
        # if no conditions apply set an empty value
        else:
            notification_type = ''

        # create and save the notification with the user and notification type
        serializer.save(user=user, notification_type=notification_type)


class NotificationRetrieveDestroy(RetrieveDestroyAPIView):
    """
    delete: Delete the notification with the given id. The notification has to be associated with the user.

    get: Retrieve details of a user's notification and provide links to associated models.
    - If the notification refers to a comment, link to the new comment added.
    - If the notification refers to an application, link to application creation and status update.
    - If the application refers to a pet, link to a new pet listing.
    It also updates the state of a notification from "unread" to "read".
    """
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)

    def get_object(self):
        notification = super().get_object()
        notification.read = True
        notification.save()
        return notification
