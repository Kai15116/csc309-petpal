from django.db import models

# Create your models here.


class Application(models.Model):

    STATUS_CHOICES = [
        ('accepted', 'Accepted'),
        ('denied', 'Denied'),
        ('pending', 'Pending'),
        ('withdrawn', 'Withdrawn')
    ]

    pet = models.ForeignKey('pets.Pet', on_delete=models.CASCADE)
    user = models.ForeignKey('accounts.PetSeeker', on_delete=models.SET_NULL, null=True)  # pet seeker who sent the application
    status = models.CharField(max_length=9, choices=STATUS_CHOICES, default='pending')

    name = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=12)
    email = models.EmailField(max_length=254)
    address = models.CharField(max_length=128)
    qualifications = models.TextField()
    digital_signature = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
