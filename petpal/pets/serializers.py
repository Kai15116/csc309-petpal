from rest_framework.serializers import ModelSerializer, FloatField, DecimalField, DateTimeField, ChoiceField, IntegerField

from .models import Pet
import copy


class PetSerializer(ModelSerializer):

    class Meta:
        model = Pet
        exclude = ['id', 'last_modified', 'owner']
        read_only_fields = ['id', 'last_modified', 'owner']


class PetSearchSerializer(ModelSerializer):
    ORDER_BY_CHOICES = [
        'name', '-name',
        'age', '-age',
        'weight', '-weight'
        'adoption_fee', '-adoption_fee'
    ]
    order_by = ChoiceField(choices=ORDER_BY_CHOICES, required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for key in self.get_fields():
            field = self.fields[key]
            field.required = False

            if isinstance(field, (FloatField, DecimalField, DateTimeField)):
                self.fields[f'{key}__gt'] = copy.deepcopy(field)
                self.fields[f'{key}__gte'] = copy.deepcopy(field)
                self.fields[f'{key}__lt'] = copy.deepcopy(field)
                self.fields[f'{key}__lte'] = copy.deepcopy(field)

                self.fields[f'{key}__gt'].required = False
                self.fields[f'{key}__gte'].required = False
                self.fields[f'{key}__lt'].required = False
                self.fields[f'{key}__lte'].required = False

    class Meta:
        model = Pet
        exclude = ['id', 'name', 'adoption_location', 'medical_history', 'notes', 'picture_1', 'picture_2', 'picture_3']
