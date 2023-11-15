from rest_framework.serializers import ModelSerializer
from django.contrib.contenttypes.models import ContentType
from .models import Comment, Rating
from accounts.models import User

from applications.serializers import CreateApplicationSerializer


class CommentSerializer(ModelSerializer):

    # content_object = CreateApplicationSerializer(read_only=True)

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
            # 'content_object',
        ]

        read_only_fields = ['id', 'user', 'content_type', 'created_at']
        
    # def create(self, validated_data):
    #     content_type = validated_data['content_type']
    #     object_id = validated_data['object_id']
    #
    #     content_type_instance = ContentType.objects.get(model=content_type)
    #
    #     comment = Comment.objects.create(
    #         user=self.context['request'].user,
    #         text=validated_data['text'],
    #         reply_to=validated_data.get('reply_to'),
    #         content_type=content_type_instance,
    #         object_id=object_id,
    #     )
    #
    #     return comment
    
    

class RatingSerializer(ModelSerializer):
    class Meta:
        model = Rating
        fields = [
            'user',
            'shelter',
            'rating',
        ]
