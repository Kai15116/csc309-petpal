from rest_framework import serializers
from rest_framework.reverse import reverse_lazy, reverse

from .models import Notification

from drf_yasg.utils import swagger_serializer_method



# from tokenize import Comment


class NotificationSerializer(serializers.ModelSerializer):
    model_link = serializers.SerializerMethodField()
    comment_object_id = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = ['id', 'user', 'created_at', 'read', 'content_type', 'object_id', 'notification_type', 'model_link',
                  'comment_object_id']
        read_only_fields = ['id', 'user', 'created_at', 'read', 'shelter', 'comment_object_id']
        extra_kwargs = {'id': {'help_text': 'Identifier of the notifications.'}}

    @swagger_serializer_method(serializer_or_field=serializers.IntegerField(help_text="Object Id of the comment, if notification is for comment."))
    def get_comment_object_id(self, obj):
        if hasattr(obj, 'content_type') and obj.content_type.model == "comment":
            return obj.content_object.object_id
        return None

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
