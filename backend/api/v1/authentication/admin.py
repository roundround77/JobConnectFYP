# Import necessary modules from Django.
from django.contrib import admin
from .models import User, User_basic_info, UserEducation, UserExperience, UserSkills
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Create a custom UserAdmin class based on BaseUserAdmin for User model.
class UserAdmin(BaseUserAdmin):
    list_display = ['id', "email", "username", "is_admin", "is_client", "is_creator"]
    list_filter = ["is_admin",]
    fieldsets = [
        (None, {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["username",]}),
        ("Permissions", {"fields": ["is_admin", "is_client", "is_creator"]}),
    ]
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "username", "password", "password2"],
            },
        ),
    ]
    search_fields = ["email"]
    ordering = ["email", "id"]
    filter_horizontal = []

# Register the User model with the custom UserAdmin class.
admin.site.register(User, UserAdmin)

# Create an admin class for the User_basic_info model.
class UserBasicdetailAdmin(admin.ModelAdmin):
    list_display=['id', 'user', 'first_name', 'phone_no', 'current_position', 'resume', 'categories', 'language', 'gender', 'date_of_birth', 'age', 'qualification', 'year_of_experience', 'your_photo', 'cover_image', 'video_profile', 'email']

# Register the User_basic_info model with the custom UserBasicdetailAdmin class.
admin.site.register(User_basic_info, UserBasicdetailAdmin)

# Create an admin class for the UserEducation model.
class UserEducationAdmin(admin.ModelAdmin):
    list_display=['id', 'title', 'level_of_education', '_from', '_to', 'description', 'user']

# Register the UserEducation model with the custom UserEducationAdmin class.
admin.site.register(UserEducation, UserEducationAdmin)

# Create an admin class for the UserExperience model.
class UserExperienceAdmin(admin.ModelAdmin):
    list_display=['id', 'job_title', 'company', '_from', '_to', 'description', 'user']

# Register the UserExperience model with the custom UserExperienceAdmin class.
admin.site.register(UserExperience, UserExperienceAdmin)

# Create an admin class for the UserSkills model.
class UserSkillAdmin(admin.ModelAdmin):
    list_display=['id', 'user', 'skills']

# Register the UserSkills model with the custom UserSkillAdmin class.
admin.site.register(UserSkills, UserSkillAdmin)
