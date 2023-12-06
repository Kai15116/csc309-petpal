from rest_framework.serializers import ModelSerializer, FloatField, DecimalField, DateTimeField, ChoiceField, SerializerMethodField, CharField

from .models import Pet, Breed, PetType
import copy

from drf_yasg.utils import swagger_serializer_method


class PetSerializer(ModelSerializer):
    breed_name = SerializerMethodField()
    pet_type_name = SerializerMethodField()

    class Meta:
        model = Pet
        fields = '__all__'
        read_only_fields = ['id', 'last_modified', 'owner', 'pet_type_name', 'breed_name']
        extra_kwargs = {'id': {'help_text': 'Id of the pet.'}}

    @swagger_serializer_method(serializer_or_field=CharField(help_text="String representation of pet type."))
    def get_pet_type_name(self, obj):
        if hasattr(obj, 'pet_type') and obj.pet_type:
            return obj.pet_type.name
        return None

    @swagger_serializer_method(serializer_or_field=CharField(help_text="String representation of breed."))
    def get_breed_name(self, obj):
        if hasattr(obj, 'breed') and obj.breed:
            return obj.breed.name
        return None


class PetSearchSerializer(ModelSerializer):
    ORDER_BY_CHOICES = [
        'name', '-name',
        'age', '-age',
        'weight', '-weight',
        'adoption_fee', '-adoption_fee'
    ]
    order_by = ChoiceField(choices=ORDER_BY_CHOICES, required=False,
                           help_text='Options for sorting. Negative sign (-) indicates descending order.')
    status = ChoiceField(choices=Pet.STATUS_CHOICES, default="available")

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

                self.fields[f'{key}__gt'].help_text = f"Upper bound (exclusive) of {key} for filtering."
                self.fields[f'{key}__gte'].help_text = f"Upper bound (inclusive) of {key} for filtering."
                self.fields[f'{key}__lt'].help_text = f"Lower bound (exclusive) of {key} for filtering."
                self.fields[f'{key}__lte'].help_text = f"Lower bound (inclusive) of {key} for filtering."

                self.fields[f'{key}__gt'].required = False
                self.fields[f'{key}__gte'].required = False
                self.fields[f'{key}__lt'].required = False
                self.fields[f'{key}__lte'].required = False

    class Meta:
        model = Pet
        exclude = ['id', 'adoption_location', 'medical_history', 'notes', 'picture_1', 'picture_2', 'picture_3']


class PetTypeSerializer(ModelSerializer):

    class Meta:
        model = PetType
        fields = '__all__'

class BreedSerializer(ModelSerializer):

    class Meta:
        model = Breed
        fields = '__all__'
