from typing import Any, Dict
from rest_framework.serializers import ModelSerializer, DateTimeField, ListField, \
    PrimaryKeyRelatedField, HyperlinkedRelatedField

from .models import PetSeeker, PetShelter, User

from django.core.exceptions import ValidationError

from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed



class CustomizedTokenObtainSerializer(TokenObtainPairSerializer):
    def validate(self, attrs: Dict[str, Any]) -> Dict[Any, Any]:
        # validated_data = super().validate(attrs)
      
        username = attrs.get("username")
        password = attrs.get("password")
        try:
            user = User.objects.get(username=username)
        except:

            raise ValidationError({"username":"User Not Found."})

        if not user.check_password(password):
            raise ValidationError({"password":"Password is incorrect."})
        return super().validate(attrs)


class PetSeekerSerializer(ModelSerializer):
    class Meta:
        model = PetSeeker
        fields = '__all__'

class PetShelterSerializer(ModelSerializer):
    class Meta:
        model = PetShelter
        fields = '__all__'

    def create(self, data):
        user = PetShelter.objects.create_user(
            username=data.get('username', ''),
            phone_number=data.get('phone_number', ''),
            email=data.get('email', ''),
            first_name=data.get('first_name', ''),
            last_name=data.get('last_name', ''),
            address=data.get('address', ''),
            mission_title=data.get('mission_title', ''),
            mission_statement=data.get('mission_statement', '')  
        )
        user.set_password(data["password"])
        user.save()
        
        return user




