from django.contrib import admin
from django.contrib.contenttypes.models import ContentType

from .models import Pet

# Register your models here.
admin.site.register(Pet)
admin.site.register(ContentType)
