from django.core.validators import MinValueValidator
from django.db import models

class Blog(models.Model):
    owner = models.ForeignKey('accounts.PetShelter', on_delete=models.CASCADE,
                            help_text='Pet shelter that created the blog.')
        
    title = models.CharField(max_length=255, help_text='Title of the blog.')
    content = models.TextField(help_text='Content of the blog in markdown.')

    picture_1 = models.ImageField(upload_to='blog_images/', help_text='Picture 1 of the blog.')
    picture_2 = models.ImageField(upload_to='blog_images/', blank=True, null=True, help_text='Picture 2 of the blog.')
    picture_3 = models.ImageField(upload_to='blog_images/', blank=True, null=True, help_text='Picture 3 of the blog.')

    likes = models.PositiveIntegerField(default=0, help_text='Number of likes for the blog.')

    last_modified = models.DateTimeField(auto_now=True, help_text='Time when the most recent update was made on blog.')
    
    def __str__(self):
        return f'{self.title}:{self.pk}'