from rest_framework.serializers import ModelSerializer, FloatField, DecimalField, DateTimeField, ChoiceField, IntegerField

from .models import Blog
import copy

class BlogSerializer(ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'
        read_only_fields = ['id', 'last_modified', 'owner']
        extra_kwargs = {'id': {'help_text': 'Id of the blog.'}}

class BlogSearchSerializer(ModelSerializer):
    ORDER_BY_CHOICES = [
        'title', '-title',
        'likes', '-likes',
        'last_modified', '-last_modified'
    ]
    order_by = ChoiceField(choices=ORDER_BY_CHOICES, required=False,
                           help_text='Options for sorting. Negative sign (-) indicates descending order.')

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
        model = Blog
        exclude = ['id', 'content', 'picture_1', 'picture_2', 'picture_3', 'likes', 'last_modified']
