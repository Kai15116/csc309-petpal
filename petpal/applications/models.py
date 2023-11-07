from django.db import models

# Create your models here.


class Application(models.Model):
    pet = models.ForeignKey('pets.Pet', on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    phone_number = models.CharField(max_length=12)
    email = models.EmailField(max_length=254)
    is_18 = models.BooleanField(default=False)
    address = models.CharField(max_length=128)
    qualifications = models.TextField()
    digital_signature = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)
