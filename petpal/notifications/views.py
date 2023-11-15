from accounts.models import PetSeeker, PetShelter
from applications.models import Application
from pets.models import Pet
from .models import Notification
from django.urls import reverse_lazy
from tokenize import Comment
from .serializers import NotificationSerializer
from rest_framework.generics import CreateAPIView, UpdateAPIView, ListAPIView, DestroyAPIView, RetrieveAPIView
from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_object_or_404

class NotificationCreate(CreateAPIView):
    """
    perform_create:
    Create a new notification based on the type of action and user involved.

    If the user is a PetSeeker and the content_object refers to an Application, it creates a status update notification.
    If the user is a PetShelter and the content_object refers to an Application, it creates an application creation notification.
    If the user is a PetShelter and the content_object refers to a Comment, and the comment.content_object refers to Shelter,
    it creates a new review notification.
    If the content_object refers to a Comment and comment.content_object refers to an Application, it creates a new message notification.
    If the content_object refers to a Pet, it creates a new pet listing notification.

    post:
    Create a new notification based on the provided data. The notification type and user association
    are determined by the type of user and the type of content object involved.
    """
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def perform_create(self, serializer):
        # content_type = serializer.validated_data.get('content_type')
        # object_id = serializer.validated_data.get('object_id')

        # content_object = self.get_content_object(content_type, object_id)

        content_object = serializer.validated_data['content_object']
        user = self.request.user
        # if user is PetSeeker AND content_object refers to Application => status update notification
        if isinstance(user, PetSeeker) and isinstance(content_object, Application):
            notification_type = 'status_update'
        
        # if user is PetShelter AND content_object refers to Application => application creation notification
        elif isinstance(user, PetShelter) and isinstance(content_object, Application):
            notification_type = 'application_creation'

        # if user is PetShelter AND content_object refers to Comment AND comment.content_object refers to Shelter
        elif isinstance(user, PetShelter) and isinstance(content_object, Comment) and isinstance(content_object.content_object, PetShelter):
            notification_type = 'new_review'
        
        # if content_object refers to Comment AND comment.content_object refers to Application => new message notification
        elif isinstance(content_object, Comment) and isinstance(content_object.content_object, Application):
            notification_type = 'new_message'
            
        # if content_object refers to Pet => new pet listing notification
        elif isinstance(content_object, Pet):
            notification_type = 'new_pet_listing'
        
        # if no conditions apply set an empty value
        else:
            notification_type = ''

        # create and save the notification with the user and notification type
        serializer.save(user=user, notification_type=notification_type)

    def post(self, request, *args, **kwargs):
        # creating a new notification
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return self.response(serializer.data, headers=headers)
    
    def get_content_object(self, content_type_id, object_id):
        try:
            content_type = ContentType.objects.get_for_id(content_type_id)
            model_class = content_type.model_class()
            return get_object_or_404(model_class, pk=object_id)
        except ContentType.DoesNotExist:
            return None  # or raise an appropriate exception

class NotificationUpdate(UpdateAPIView):
    """
    Update the state of a notification from "unread" to "read".

    put: Update a notification by updating read attribute for that object
    """
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    lookup_field = 'notification_id'  

     # change the state of a notification from "unread" to "read".
    def perform_update(self, serializer):
        serializer.save(read=True)

    def put(self, request, *args, **kwargs):
        # update the notification 
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return self.response(serializer.data)

class NotificationList(ListAPIView):
    """
    Retrieve a list of notifications for the authenticated user.

    get: 
    Users (shelter and seeker) can only view their own notifications.
    Filter notifications by read/unread to get all unread notifications.
    Sort notifications by creation time in descending order (latest first).
    """
    serializer_class = NotificationSerializer

    def get(self, request, *args, **kwargs):
        # retrieve a list of notifications with filtering and sorting
        user = self.request.user
        queryset = Notification.objects.filter(user=user, read=False).order_by('-created_at')
        serializer = self.get_serializer(queryset, many=True)
        return self.response(serializer.data)


class NotificationDelete(DestroyAPIView):
    """
    delete: Delete a notification object.
    """
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    lookup_field = 'notification_id'

    def delete(self, request, *args, **kwargs):
        # delete a notification
        instance = self.get_object()
        self.perform_destroy(instance)
        return self.response(status=204)
    
class NotificationGet(RetrieveAPIView):
    """
    get_context_data:
    Retrieve details of a notification and provide links to associated models.

    If the notification refers to a comment, link to the new comment added.
    If the notification refers to an application, link to application creation and status update.
    If the application refers to a pet, link to a new pet listing.

    get: Object will be retrieved with details of a notification and providing links to associated models.
    """
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    lookup_field = 'notification_id'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        notification = self.get_object()
        content_object = notification.content_object

        # if the notification refers to comment link to new comment added
        if isinstance(content_object, Comment):
            context['associated_model_link'] = reverse_lazy('comment-detail', kwargs={'pk': content_object.pk})

        # if notification refers to appplication link to application creation and status update
        elif isinstance(content_object, Application):
            context['associated_model_link'] = reverse_lazy('application-detail', kwargs={'pk': content_object.pk})
        
        # if application refers to pet link to new pet listing
        elif isinstance(content_object, Pet):
            context['associated_model_link'] = reverse_lazy('pet-detail', kwargs={'pk': content_object.pk})

        return context
    
    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        context = self.get_context_data()
        context.update(serializer.data)
        return self.response(context)
    