from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models

# Create your models here.

# if user is PetSeeker AND content_object refers to Application => status update notification
# if user is PetShelter AND content_object refers to Application => application creation notification
# if user is PetShelter AND content_object refers to Comment AND comment.content_object refers to Shelter
#                                                                                       => new review notification
# if content_object refers to Comment AND comment.content_object refers to Application => new message notification
# if content_object refers to Pet => new pet listing notification


class Notification(models.Model):
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    # can reference comment, pet, application
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    # attribute for the type of notification
    notification_type = models.CharField()