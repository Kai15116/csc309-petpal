from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(unique=True, help_text="email of the user")

    phone_number = models.CharField(max_length=12, blank=True, null=True, help_text="phone number of the user")
    address = models.CharField(max_length=128, blank=True, null=True, help_text="address of the user")

    description = models.TextField(blank=True, null=True, help_text="user description")  # text field vs char field
    website = models.URLField(max_length=256, blank=True, null=True, help_text="a website linked to the shelter or seeker profile")

    banner = models.ImageField(upload_to='banners/', blank=True, null=True, help_text="user profile banner")
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True, help_text="user profile picture")


    def __str__(self):
        return str(self.id)

    def is_pet_seeker(self):
        return hasattr(self, 'petseeker')

    def is_pet_shelter(self):
        return hasattr(self, 'petshelter')



class PetSeeker(User):
    pass


class PetShelter(User):
    mission_title = models.CharField(max_length=128, blank=True, null=True, help_text="mission_title of the pet shelter")
    mission_statement = models.TextField(blank=True, null=True, help_text="mission_statement of the pet shelter")  # text field vs char field


