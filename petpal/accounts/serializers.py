from typing import Any, Dict
from rest_framework.serializers import ModelSerializer, DateTimeField, ListField, \
    PrimaryKeyRelatedField, HyperlinkedRelatedField, CharField

from .models import PetSeeker, PetShelter, User
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError

from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied




class CustomizedTokenObtainSerializer(TokenObtainPairSerializer):
    def validate(self, attrs: Dict[str, Any]) -> Dict[Any, Any]:
        # validated_data = super().validate(attrs)
        username = attrs.get("username")
        password = attrs.get("password")
        try:
            user = User.objects.get(username=username)
        except:

            raise serializers.ValidationError({"username":"User Not Found."})

        if not user.check_password(password):
            raise serializers.ValidationError({"password":"Password is incorrect."})
        return super().validate(attrs)


class PetSeekerSerializer(ModelSerializer):
    password = CharField(write_only=True)
    class Meta:
        model = PetSeeker
        fields = ["id","username", "password", "phone_number", "email", "first_name", "last_name", "address", \
                  "description","banner", "profile_picture"]
    
    def create(self, data):
        password = data.pop("password")
        user = PetSeeker.objects.create_user(**data)
        user.set_password(password)
        user.save()
        
        return user
    
    

class PetShelterSerializer(ModelSerializer):
    password = CharField(write_only=True)
    class Meta:
        model = PetShelter
        fields = ["id", "username", "password", "phone_number", "email", "first_name", "last_name", "address", \
                  "description","banner", "profile_picture", "mission_title", "mission_statement"]

    def create(self, data):
        password = data.pop("password")
        user = PetShelter.objects.create_user(**data
            # username=data.get('username', ''),
            # phone_number=data.get('phone_number', ''),
            # email=data.get('email', ''),
            # first_name=data.get('first_name', ''),
            # last_name=data.get('last_name', ''),
            # address=data.get('address', ''),
            # mission_title=data.get('mission_title', ''),
            # mission_statement=data.get('mission_statement', '')  
        )
        user.set_password(password)
        user.save()
        
        return user




