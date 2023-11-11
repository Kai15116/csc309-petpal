from petpal.accounts.models import PetSeeker, PetShelter
from petpal.applications.models import Application
from petpal.pets.models import Pet
from .models import Notification
from django.views.generic import CreateView, ListView, DeleteView, DetailView
from django.shortcuts import get_object_or_404
from django.urls import reverse_lazy
from tokenize import Comment


class NotificationCreate(CreateView):
    model = Notification

    def form_valid(self, form):
        content_object = self.object.content_object
        user = self.request.user

        # if user is PetSeeker AND content_object refers to Application => status update notification
        if isinstance(user, PetSeeker) and isinstance(content_object, Application):
            notification_type = 'status_update'
        
        # if user is PetShelter AND content_object refers to Application => application creation notification
        elif isinstance(user, PetShelter) and isinstance(content_object, Application):
            notification_type = 'application_creation'

        # if user is PetShelter AND content_object refers to Comment AND comment.content_object refers to Shelter
        elif isinstance(user, PetShelter) and isinstance(content_object, Comment) and isinstance(content_object.content_object, Shelter):
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
        Notification.objects.create(user=user, notification_type=notification_type, **form.cleaned_data)

        return super().form_valid(form)


class NotificationList(ListView):
    model = Notification

    def get_queryset(self):
        user = self.request.user

        # users (shelter and seeker) can only view their own notifications
        queryset = Notification.objects.filter(user=user)

        # filter notifications by read/unread to get all unread notifications
        queryset = queryset.filter(read=False)

        # sort notifications by creation time in descending order (latest first)
        queryset = queryset.order_by('-created_at')

        # list view handles pagination
        return queryset


class NotificationDelete(DeleteView):
    # set notification model
    model = Notification
    success_url = reverse_lazy('your_success_url_name')

    # get object by id
    def get_object(self, queryset=None):
        notification_id = self.kwargs.get('notification_id')
        return get_object_or_404(Notification, id=notification_id)

    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)


class NotificationGet(DetailView):
    # set notification model
    model = Notification

    # get all notifications
    queryset = Notification.objects.all()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        notification = self.object
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
    