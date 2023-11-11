from typing import Any, Dict
from rest_framework.serializers import ModelSerializer, DateTimeField, ListField, \
    PrimaryKeyRelatedField, HyperlinkedRelatedField
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from .models import PetSeeker, PetShelter, User

from django.core.exceptions import ValidationError

class CustomizedTokenObtainSerializer(TokenObtainSerializer):
    def validate(self, attrs: Dict[str, Any]) -> Dict[Any, Any]:
        validated_data = super().validate(attrs)
      
        username = attrs.get("username")
        password = attrs.get("password")
        try:
            user = User.objects.get(username=username)
        except:
            raise ValidationError({"username":"User Not Found."})

        if not user.check_password(password):
            raise ValidationError({"password":"Password is incorrect."})
        return validated_data


class PetSeekerSerializer(ModelSerializer):
    class Meta:
        model = PetSeeker
        fields = '__all__'

class PetShelterSerializer(ModelSerializer):
    class Meta:
        model = PetShelter
        fields = '__all__'

