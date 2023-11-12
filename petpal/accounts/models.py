from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(unique=True)

    phone_number = models.CharField(max_length=12)
    address = models.CharField(max_length=128)

    description = models.TextField(blank=True, null=True)  # text field vs char field
    website = models.URLField(max_length=256, blank=True, null=True)

    banner = models.ImageField(upload_to='banners/', blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    def is_pet_seeker(self):
        return hasattr(self, 'petseeker')

    def is_pet_shelter(self):
        return hasattr(self, 'petshelter')


class PetSeeker(User):
    pass


class PetShelter(User):
    mission_title = models.CharField(max_length=128)
    mission_statement = models.TextField()  # text field vs char field


