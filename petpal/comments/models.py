from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.validators import MaxValueValidator
from django.db import models

from django.apps import apps

class Comment(models.Model):
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, help_text='User who wrote the comment')
    text = models.TextField(max_length=500, help_text='Text of the comment')
    created_at = models.DateTimeField(auto_now_add=True, help_text='Date when the comment was created')
    reply_to = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, help_text='Who the comment is referring to')

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, help_text='Model type that is being commented on')
    object_id = models.PositiveIntegerField(help_text='Primary Key of the model being commented on')
    content_object = GenericForeignKey('content_type', 'object_id')

    class Meta:
        indexes = [
            models.Index(fields=['content_type', 'object_id']),
        ]

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        super().save(force_insert, force_update, using, update_fields)
        if isinstance(self.content_object, apps.get_model('applications', 'Application')):
            application = self.content_object
            application.last_updated = self.created_at
            application.save()


class Rating(models.Model):
    user = models.ForeignKey('accounts.User', null=True, on_delete=models.SET_NULL, help_text='User who gave the rating') # Rating value stays after delete
    shelter = models.ForeignKey('accounts.PetShelter', on_delete=models.CASCADE, related_name='ratings', help_text='Shelter that the rating is for')
    rating = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(limit_value=5)], help_text='Integer value between 0-5 that depicts the rating of the shelter by the user')
