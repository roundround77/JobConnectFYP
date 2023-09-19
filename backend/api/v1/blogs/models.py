from django.db import models
from api.v1.authentication.models import User  # Import the User model from another app

# Create your models here.

# Model for managing blog entries
class Blogs(models.Model):
    # Define a foreign key relationship with the User model
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # Field to store an image for the blog (optional)
    image = models.ImageField(upload_to="user_image", null=True, blank=True)

    # Field to store the date of the blog (optional)
    date = models.CharField(max_length=100, null=True, blank=True)

    # Field to store the title of the blog
    title = models.CharField(max_length=100)

    # Field to store the description or content of the blog
    description = models.TextField()

    # Field to store the creation timestamp (auto-generated)
    created_at = models.DateTimeField(auto_now_add=True)

    # Field to store the last update timestamp (auto-generated)
    updated_at = models.DateTimeField(auto_now=True)

    # Define the required fields for this model
    REQUIRED_FIELDS = ['title', 'description', 'user', 'date']
