from django.contrib import admin
from django.contrib.contenttypes.models import ContentType

from .models import Blog

# Register your models here.
admin.site.register(Blog)
