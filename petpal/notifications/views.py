from petpal.accounts.models import PetSeeker, PetShelter
from petpal.applications.models import Application
from petpal.pets.models import Pet
from .models import Notification
from django.urls import reverse_lazy
from tokenize import Comment
from .serializers import NotificationSerializer
from rest_framework.generics import CreateAPIView, UpdateAPIView, ListAPIView, DestroyAPIView, RetrieveAPIView

class NotificationCreate(CreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def perform_create(self, serializer):
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

class NotificationUpdate(UpdateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    lookup_field = 'notification_id'  

     # change the state of a notification from "unread" to "read".
    def perform_update(self, serializer):
        serializer.save(read=True)

class NotificationList(ListAPIView):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        user = self.request.user
        # users (shelter and seeker) can only view their own notifications
        # filter notifications by read/unread to get all unread notifications
        # sort notifications by creation time in descending order (latest first)
        queryset = Notification.objects.filter(user=user, read=False).order_by('-created_at')
        return queryset

class NotificationDelete(DestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    lookup_field = 'notification_id'
    
class NotificationGet(RetrieveAPIView):
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
    