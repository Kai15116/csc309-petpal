from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, PetSeeker, PetShelter

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(PetShelter)
admin.site.register(PetSeeker)