# Import necessary modules from Django.
from django.contrib import admin
from .models import Company  # Import the Company model from your application's models.

# Register your models here.

# Define an admin class for the Company model.
class BlogsAdmin(admin.ModelAdmin):
    model = Company  # Specify the model to be associated with this admin class.
    fields = ['user', 'company_name', 'overview', 'jobs', 'category', 'company_size', 'founded_in', 'location', 'phone', 'email']
    # Define the fields to be displayed in the admin panel for the Company model.

# Register the Company model with the BlogsAdmin class, allowing it to be managed in the admin panel.
admin.site.register(Company, BlogsAdmin)
