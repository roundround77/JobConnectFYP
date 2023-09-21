# Import necessary modules from Django.
from django.db import models
from api.v1.authentication.models import User, User_basic_info
from api.v1.add_job.models import AddJob

# Create your models here.
class ApplyForJob(models.Model):
    # Define choices for the status field.
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ] 

    # Define a ForeignKey relationship to the User model with cascading delete.
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # Define a ForeignKey relationship to the AddJob model with cascading delete.
    job = models.ForeignKey(AddJob, on_delete=models.CASCADE)

    # Define a DateField for the date the application was posted.
    date_posted = models.DateField(auto_now_add=True)

    # Define an IntegerField for the required salary.
    required_salary = models.IntegerField()

    # Define a FileField for job application videos with optional upload path.
    video = models.FileField(upload_to="job_video", null=True, blank=True)

    # Define a CharField for career level with a default value.
    career_level = models.CharField(max_length=20, default="Graduation")

    # Define a CharField for qualification.
    qualification = models.CharField(max_length=20)

    # Define a CharField for experience.
    experience = models.CharField(max_length=10)

    # Define a TextField for application description with optional blank value.
    description = models.TextField(blank=True)

    # Define a CharField for the status field with predefined choices and a default value.
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    # Define a CharField for skills.
    skills = models.CharField(max_length=100)

    # Define Date and Time fields for created and updated timestamps.
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Define required fields for the model.
    REQUIRED_FIELDS = ['date_posted', 'qualification', 'experience', 'skills', 'required_salary', 'user', 'job', 'description']
