from rest_framework import serializers
from rest_framework.reverse import reverse

from .models import Notification

from drf_yasg.utils import swagger_serializer_method

# from tokenize import Comment


class NotificationSerializer(serializers.ModelSerializer):

    model_link = serializers.SerializerMethodField()
    notification_type = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = ['id', 'user', 'created_at', 'read', 'content_type', 'object_id', 'notification_type', 'model_link']
        read_only_fields = ['id', 'user', 'created_at', 'read']
        extra_kwargs = {'id': {'help_text': 'Identifier of the notifications.'}}

    @swagger_serializer_method(serializer_or_field=serializers.URLField(help_text="Link to its associated model. "))
    def get_model_link(self, obj):
        object_id = obj.object_id
        request = self.context.get('request')

        # if the notification refers to comment link to new comment added
        if obj.content_type.model == "comment":
            # context['associated_model_link'] = reverse_lazy('comment-detail', kwargs={'pk': content_object.pk})
            return request.build_absolute_uri(reverse('comments:comment-retrieve-view', kwargs={
                'pk': object_id,
            }))

        # if notification refers to appplication link to application creation and status update
        if obj.content_type.model == "application":
            return request.build_absolute_uri(reverse('applications:with_id', kwargs={
                'pk': object_id,
            }))

        # if application refers to pet link to new pet listing
        if obj.content_type.model == "pet":
            return request.build_absolute_uri(reverse('pets:with_id', kwargs={
                'pk': object_id,
            }))
        return

    @swagger_serializer_method(serializer_or_field=serializers.ChoiceField(help_text="Textual representation of the type of notification.",
                                                                           choices=['status_update',
                                                                                    'application_creation',
                                                                                    'new_review',
                                                                                    'new_message',
                                                                                    'new_pet_listing',
                                                                                    '']))
    def get_notification_type(self, obj):
        user = obj.user
        content_type = obj.content_type
        content_object = obj.content_object

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
        return notification_type

