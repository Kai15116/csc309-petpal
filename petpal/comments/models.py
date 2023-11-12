from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.validators import MaxValueValidator
from django.db import models

from django.apps import apps


# Create your models here.


# comment for shelter and application

class Comment(models.Model):
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE)

    # rating = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(limit_value=5)])
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    reply_to = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
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
    shelter = models.ForeignKey('accounts.PetShelter', on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(limit_value=5)])
