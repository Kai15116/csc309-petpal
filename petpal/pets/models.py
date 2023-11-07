from django.core.validators import MinValueValidator
from django.db import models

# Create your models here.


class PetType(models.Model):
    name = models.CharField(max_length=64)


class Breed(models.Model):
    pet_type = models.ForeignKey(PetType, on_delete=models.CASCADE)
    name = models.CharField(max_length=64)


class Pet(models.Model):
    SEX_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('unknown', 'Unknown'),
    )

    STATUS_CHOICES = {
        ('available', 'Available'),
        ('adopted', 'Adopted'),
        ('pending', 'Pending'),
        ('withdrawn', 'Withdrawn'),
    }

    name = models.CharField(max_length=128)
    owner = models.ForeignKey('accounts.PetShelter', on_delete=models.CASCADE)
    status = models.CharField(max_length=9, choices=STATUS_CHOICES, default='available')
    pet_type = models.ForeignKey(PetType, on_delete=models.SET_NULL, blank=True, null=True)  # null for others?
    sex = models.CharField(max_length=7, choices=SEX_CHOICES, default='unknown')
    breed = models.ForeignKey(Breed, on_delete=models.SET_NULL, blank=True, null=True)  # null for others?

    # should we have color?

    age = models.FloatField(validators=[MinValueValidator(limit_value=0)])
    weight = models.FloatField(validators=[MinValueValidator(limit_value=0)])
    adoption_fee = models.DecimalField(max_digits=6, decimal_places=2, validators=[MinValueValidator(limit_value=0.01)])
    adoption_location = models.CharField(max_length=128)
    medical_history = models.TextField()  # text field vs char field
    notes = models.TextField()

    picture_1 = models.ImageField(upload_to='pet_images/')
    picture_2 = models.ImageField(upload_to='pet_images/', blank=True, null=True)
    picture_3 = models.ImageField(upload_to='pet_images/', blank=True, null=True)

    last_modified = models.DateTimeField(auto_now=True)
