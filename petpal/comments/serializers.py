from rest_framework.serializers import ModelSerializer
from django.contrib.contenttypes.models import ContentType
from models import Comment, Rating
from accounts.models import 

class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            'user',
            'text', 
            'created_at',
            'reply_to',
            'content_type',
            'object_id',
            'content_object',
        ]
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        validated_data['content_type'] = ContentType.objects.get_for_model(PetShelter)
        return super().create(validated_data)

class RatingSerializer(ModelSerializer):
    class Meta:
        model = Rating
        field = [
            'user',
            'shelter',
            'rating',
        ]