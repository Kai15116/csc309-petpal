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
    )

    STATUS_CHOICES = {
        ('available', 'Available'),
        ('adopted', 'Adopted'),
        ('pending', 'Pending'),
        ('withdrawn', 'Withdrawn'),
    }

    COLOR_CHOICES = {
        ('black', 'Black'),
        ('white', 'White'),
        ('brown', 'Brown'),
        ('gray', 'Gray'),
        ('orange', 'Orange'),
    }

    name = models.CharField(max_length=128, help_text='Name of the pet.')
    owner = models.ForeignKey('accounts.PetShelter', on_delete=models.CASCADE,
                              help_text='Pet shelter that owns the pet.')
    status = models.CharField(max_length=9, choices=STATUS_CHOICES, default='available',
                              help_text='Pet adoption status. ')
    sex = models.CharField(max_length=7, choices=SEX_CHOICES, blank=True, null=True,
                           help_text='Sex of the pet. null represents unknown/others.')

    # dog, cat, birds, etc.
    pet_type = models.ForeignKey(PetType, on_delete=models.SET_NULL, blank=True, null=True,
                                 help_text='Id of the PetType model, representing the type (or category) '
                                           'of the pet such as dog, cat, birds, etc. null represents unknown/others.')

    # american bobtail and others
    breed = models.ForeignKey(Breed, on_delete=models.SET_NULL, blank=True, null=True,
                              help_text='Id of the Breed model, representing the breed of the pet '
                                        '(e.g. American Bobtail).')

    # maybe support multiple colors if we have time.
    color = models.CharField(max_length=10, choices=COLOR_CHOICES, blank=True, null=True,
                             help_text='Color of the pet. null represents unknown/others.')

    age = models.FloatField(validators=[MinValueValidator(limit_value=0)], help_text='Age of the pet.')
    weight = models.FloatField(validators=[MinValueValidator(limit_value=0)], help_text='Weight of the pet.')
    adoption_fee = models.DecimalField(max_digits=10, decimal_places=2,
                                       validators=[MinValueValidator(limit_value=0.01)],
                                       help_text='Fee associated with adopting the pet.')
    adoption_location = models.CharField(max_length=128, help_text='Location where this pet is available for adoption.')
    medical_history = models.TextField(help_text='Medical history of the pet.')  # text field vs char field
    notes = models.TextField(help_text='Additional notes that Pet Shelter can provide about the pet.')

    picture_1 = models.ImageField(upload_to='pet_images/', help_text='Picture of the pet.')
    picture_2 = models.ImageField(upload_to='pet_images/', blank=True, null=True, help_text='Picture of the pet.')
    picture_3 = models.ImageField(upload_to='pet_images/', blank=True, null=True, help_text='Picture of the pet.')

    last_modified = models.DateTimeField(auto_now=True, help_text='Time when the most recent update was made on pet.')
    # add created_at if needed

    def __str__(self):
        return f'{self.name}:{self.pk}'

    # def save(
    #     self, force_insert=False, force_update=False, using=None, update_fields=None
    # ):
    #     super().
