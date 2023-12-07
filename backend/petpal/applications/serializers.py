from rest_framework.serializers import ModelSerializer, ChoiceField, SerializerMethodField
from .models import Application


class CreateApplicationSerializer(ModelSerializer):
    petname = SerializerMethodField()

    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ['created_at', 'last_updated', 'user', 'petname']
        extra_kwargs = {'id': {'help_text': 'Identifier of the application.'}}

    def get_petname(self, obj):
        if isinstance(obj, Application):
            return obj.pet.name
        return


class UpdateApplicationSerializer(ModelSerializer):
    petname = SerializerMethodField()

    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ['pet', 'user', 'name', 'phone_number', 'email', 'address', 'qualifications',
                            'digital_signature', 'created_at', 'last_updated', 'petname']
        extra_kwargs = {'status': {'required': True}}

    def get_petname(self, obj):
        if isinstance(obj, Application):
            return obj.pet.name
        return


class FilterApplicationSerializer(ModelSerializer):
    ORDER_BY_CHOICES = ['created_at', '-created_at', 'last_updated', '-last_updated']
    order_by = ChoiceField(choices=ORDER_BY_CHOICES,
                           help_text='Options for sorting. Negative sign (-) indicates descending order.',
                           required=False)

    class Meta:
        model = Application
        fields = ['status', 'order_by']
        extra_kwargs = {'status': {'help_text': 'Status to be filtered.'}}


