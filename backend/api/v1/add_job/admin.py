# Import necessary modules from Django.
from django.contrib import admin
from .models import AddJob  # Import the AddJob model from your app's models module.

# Register your models here.
# Create an admin class for the AddJob model.
class AddJobAdmin(admin.ModelAdmin):
    # Define the fields to be displayed in the admin list view.
    list_display = ['id', 'closing_date', 'hiring_location', 'offered_salary', 'career_level',
                    'qualification', 'experience', 'quantity', 'gender', 'overview',
                    'skill_and_experience', 'skills', 'requirements', 'title', 'user',
                    'image', 'created_at', 'updated_at', 'date_posted']

# Register the AddJob model with the custom admin class.
admin.site.register(AddJob, AddJobAdmin)
