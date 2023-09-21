# Import necessary modules and classes
from django.db import models
from api.v1.authentication.models import User
from api.v1.company.models import Company

# Create your models here.
class AddJob(models.Model):
    # Define the user field as a foreign key to the User model with CASCADE deletion behavior
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # Define the image field for job
    image = models.ImageField(upload_to="user_image", null=True, blank=True)

    # Define the title field for the job
    title = models.CharField(max_length=100)

    # Define the company field for the job
    company = models.CharField(max_length=100, default='No company')

    # Define the description field for the job
    description = models.CharField(max_length=10000, null=True, blank=True)

    # Define the video field for the job as a FileField
    video = models.FileField(upload_to="job_video", null=True, blank=True)

    # Define the date when the job was posted (auto_now_add=True for automatic timestamp)
    date_posted = models.DateField(auto_now_add=True)

    # Define the closing date field for the job
    closing_date = models.DateField(null=True, blank=True, default=None)

    # Define the hiring location field for the job
    hiring_location = models.CharField(max_length=100, default="Londan", null=True, blank=True)

    # Define the offered salary field for the job
    offered_salary = models.CharField(max_length=100)

    # Define the career level field for the job
    career_level = models.CharField(max_length=20, default="JUN")

    # Define the qualification field for the job
    qualification = models.CharField(max_length=20, default="Btech")

    # Define the experience field for the job
    experience = models.CharField(max_length=10, default='2 years')

    # Define the quantity field for the job
    quantity = models.CharField(max_length=20, default="1")

    # Define the gender field for the job
    gender = models.CharField(max_length=10, default="Male")

    # Define the overview field for the job
    overview = models.TextField(default="We are Ulite. With a presence in more than 60 countries, we’re a growing global organization that helps amazing companies engage with customers through mobile messaging, email, voice and video.")

    # Define the skill and experience field for the job
    skill_and_experience = models.TextField(default="UI/UX")

    # Define the skills field as a SlugField
    skills = models.SlugField()

    # Define the requirements field for the job
    requirements = models.TextField(default="UI/UX")

    # Define the created_at field for timestamp of creation (auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)

    # Define the updated_at field for timestamp of last update (auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Define the required fields for the model
    REQUIRED_FIELDS = ['skills', 'title', 'user', "company"]
