from django.contrib import admin

# Register your models here.
from .models import Comment, Rating

admin.site.register(Comment)
admin.site.register(Rating)