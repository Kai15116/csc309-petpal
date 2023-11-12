from rest_framework import serializers
from petpal.accounts.models import PetSeeker, PetShelter
from petpal.applications.models import Application
from petpal.pets.models import Pet
from .models import Notification
from tokenize import Comment

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'created_at', 'read', 'content_type', 'object_id', 'content_object', 'notification_type']
        read_only_fields = ['id', 'user', 'created_at', 'read']

    def create(self, validated_data):
        content_object = self.object.content_object
        user = self.request.user

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

        return Notification.objects.create(notification_type=notification_type, **validated_data)

