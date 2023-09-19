# Import necessary modules from Django.
from django.db import models
from api.v1.authentication.models import User  # Import the User model from the authentication app.

# Create your models here.

# Define a model named Company to represent company information.
class Company(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Define a ForeignKey for the user associated with the company.
    company_name = models.CharField(max_length=50)  # Define a field for the company name.
    overview = models.TextField()  # Define a field for the company overview.
    jobs = models.IntegerField()  # Define a field for the number of jobs.
    category = models.CharField(max_length=100)  # Define a field for the company category.
    company_size = models.CharField(max_length=50)  # Define a field for the company size.
    founded_in = models.DateField()  # Define a field for the company's founding date.
    location = models.CharField(max_length=50)  # Define a field for the company's location.
    phone = models.IntegerField()  # Define a field for the company's phone number.
    email = models.EmailField()  # Define a field for the company's email address.
    created_at = models.DateTimeField(auto_now_add=True)  # Store the creation date and time.
    updated_at = models.DateTimeField(auto_now=True)  # Store the last update date and time.
    
    # Define the required fields for creating a Company object.
    REQUIRED_FIELDS = ['user', 'company_name', 'overview', 'jobs', 'category', 'company_size', 'founded_in', 'location', 'phone', 'email']
    
    def __str__(self) -> str:
        return self.company_name  # Define a human-readable representation of the Company object.
