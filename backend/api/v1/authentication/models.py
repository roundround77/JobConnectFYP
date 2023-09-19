# Import necessary modules from Django.
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

# Create a custom UserManager class that extends BaseUserManager.
class UserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('The given email must be set')
        try:
            user = self.model(email=email, **extra_fields)
            user.set_password(password)
            user.save(using=self._db)
            return user
        except:
            raise
    
    def create_user(self, email, password=None, password2=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_active', True)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, password2=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_admin', True)
        return self._create_user(email, password=password, **extra_fields)

# Create a custom User model that extends AbstractBaseUser and PermissionsMixin.
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=255)
    is_admin = models.BooleanField(default=True)
    is_creator = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=True)
    is_client = models.BooleanField(default=True)
    is_delete = models.BooleanField(default=False)
    is_account_suspended = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password']

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        super(User, self).save(*args, **kwargs)
        return self

# Create a model for user basic information.
class User_basic_info(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email = models.EmailField(verbose_name="email address", max_length=255, unique=True, null=True, blank=True)
    your_photo = models.ImageField(upload_to="user_image", max_length=300, null=True, blank=True)
    cover_image = models.ImageField(upload_to="user_image", null=True, blank=True)
    first_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=True, blank=True)
    phone_no = models.IntegerField(null=True, blank=True)
    current_position = models.CharField(max_length=300, null=True, blank=True)
    categories = models.CharField(max_length=200, null=True, blank=True)
    resume = models.FileField(upload_to='user_image', null=True, blank=True)
    video_profile = models.FileField(upload_to='user_image', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    date_of_birth = models.DateField(null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=20, null=True, blank=True)
    language = models.CharField(max_length=100, null=True, blank=True)
    qualification = models.CharField(max_length=100, null=True, blank=True)
    description = models.CharField(max_length=1000, null=True, blank=True)
    year_of_experience = models.TextField(max_length=100, null=True, blank=True)

# Create a model for user education details.
class UserEducation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    level_of_education = models.CharField(max_length=50)
    _from = models.DateField()
    _to = models.DateField()
    description = models.TextField()
    REQUIRED_FIELDS = ['title', 'level_of_education', '_from', '_to', 'description', 'user']

# Create a model for user experience details.
class UserExperience(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job_title = models.CharField(max_length=40)
    company = models.CharField(max_length=50)
    _from = models.DateField()
    _to = models.DateField()
    description = models.TextField()
    REQUIRED_FIELDS = ['job_title', 'company', '_from', '_to', 'description', 'user']

# Create a model for user skills details.
class UserSkills(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    skills = models.CharField(max_length=200)
    REQUIRED_FIELDS = ['user', 'skills']
