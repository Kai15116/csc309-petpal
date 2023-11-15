from rest_framework import serializers
from accounts.models import PetSeeker, PetShelter
from applications.models import Application
from pets.models import Pet
from .models import Notification
from comments.models import Comment


# from tokenize import Comment


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'created_at', 'read', 'content_type', 'object_id', 'notification_type']
        read_only_fields = ['id', 'user', 'created_at', 'read']

    # def create(self, validated_data):
    #     content_object = validated_data['content_object']
    #     user = self.context['request'].user
    #
    #     if isinstance(user, PetSeeker) and isinstance(content_object, Application):
    #         notification_type = 'status_update'
    #
    #     # if user is PetShelter AND content_object refers to Application => application creation notification
    #     elif isinstance(user, PetShelter) and isinstance(content_object, Application):
    #         notification_type = 'application_creation'
    #
    #     # if user is PetShelter AND content_object refers to Comment AND comment.content_object refers to Shelter
    #     elif isinstance(user, PetShelter) and isinstance(content_object, Comment) and isinstance(content_object.content_object, PetShelter):
    #         notification_type = 'new_review'
    #
    #     # if content_object refers to Comment AND comment.content_object refers to Application => new message notification
    #     elif isinstance(content_object, Comment) and isinstance(content_object.content_object, Application):
    #         notification_type = 'new_message'
    #
    #     # if content_object refers to Pet => new pet listing notification
    #     elif isinstance(content_object, Pet):
    #         notification_type = 'new_pet_listing'
    #
    #     # if no conditions apply set an empty value
    #     else:
    #         notification_type = ''
    #
    #     return Notification.objects.create(user=user, notification_type=notification_type, **validated_data)
