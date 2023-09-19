# Import necessary modules from Django.
from django.contrib import admin
from .models import ApplyForJob

# Register your models here.

# Create an admin class for the ApplyForJob model.
class AddJobAdmin(admin.ModelAdmin):
    # Define the fields to be displayed in the admin list view.
    list_display = ['id', 'date_posted', 'carrer_level', 'video', 'qualification', 'experience', 'skills', 'required_salary', 'user', 'job', 'description']

# Register the ApplyForJob model with the custom admin class.
admin.site.register(ApplyForJob, AddJobAdmin)
