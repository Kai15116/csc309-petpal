from django.db import models

# Create your models here.


class Application(models.Model):

    STATUS_CHOICES = [
        ('accepted', 'Accepted'),
        ('denied', 'Denied'),
        ('pending', 'Pending'),
        ('withdrawn', 'Withdrawn')
    ]

    pet = models.ForeignKey('pets.Pet', on_delete=models.CASCADE, help_text='Pet associated with the application.')
    user = models.ForeignKey('accounts.PetSeeker', on_delete=models.CASCADE,
                             help_text='Pet seeker who sent the application.')
    status = models.CharField(max_length=9, choices=STATUS_CHOICES, default='pending',
                              help_text='Status of the application indicating whether application ')

    name = models.CharField(max_length=128,
                            help_text='Name of the sender who sent the application (can be different from the username).')
    phone_number = models.CharField(max_length=12,
                                    help_text='Sender\'s phone number.')
    email = models.EmailField(max_length=254,
                              help_text='Sender\'s email address.')
    address = models.CharField(max_length=128,
                               help_text='Sender\'s address.')
    qualifications = models.TextField(help_text='Sender\'s qualifications for adopting the pet.')
    digital_signature = models.CharField(max_length=128, help_text='Digital signature of the sender.')
    created_at = models.DateTimeField(auto_now_add=True, help_text='Timestamp when the application was created.')
    last_updated = models.DateTimeField(auto_now=True,
                                        help_text='Timestamp when the most recent update was made on the application. '
                                                  'Adding comment for this application will also update this value.')
