from rest_framework.serializers import ModelSerializer, ChoiceField
from .models import Application


class CreateApplicationSerializer(ModelSerializer):

    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'last_updated', 'user']


class UpdateApplicationSerializer(ModelSerializer):

    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ['pet', 'user', 'name', 'phone_number', 'email', 'address', 'qualifications',
                            'digital_signature', 'created_at', 'last_updated']
        extra_kwargs = {'status': {'required': True}}


class FilterApplicationSerializer(ModelSerializer):
    ORDER_BY_CHOICES = ['created_at', '-created_at', 'last_updated', '-last_updated']
    order_by = ChoiceField(choices=ORDER_BY_CHOICES)

    class Meta:
        model = Application
        fields = ['status', 'order_by']

