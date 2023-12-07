from rest_framework.exceptions import ValidationError
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.contrib.contenttypes.models import ContentType
from .models import Comment, Rating


class CommentSerializer(ModelSerializer):
    username = SerializerMethodField()
    profile_picture = SerializerMethodField()

    class Meta:
        model = Comment
        fields = [
            'id',
            'user',
            'text',
            'created_at',
            'reply_to',
            'content_type',
            'object_id',
            'username',
            'profile_picture'
            # 'content_object',
        ]

        read_only_fields = ['id', 'user', 'content_type', 'created_at', 'object_id', 'username', 'profile_picture']

    def get_username(self, obj):
        if isinstance(obj, Comment):
            return obj.user.username
        return

    def get_profile_picture(self, obj):
        if isinstance(obj, Comment):
            try:
                request = self.context.get("request")
                return request.build_absolute_uri(obj.user.profile_picture.url)
            except Exception as e:
                print(e)
                return
        return

class RatingSerializer(ModelSerializer):
    class Meta:
        model = Rating
        fields = [
            'user',
            'shelter',
            'rating',
        ]
        read_only_fields = ['user']
        extra_kwargs = {'shelter': {'required': True}}

