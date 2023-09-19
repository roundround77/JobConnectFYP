from django.contrib import admin
from .models import Blogs

# Register your models here.

# Blog model register
class BlogsAdmin(admin.ModelAdmin):
    model = Blogs
    # Fields to display in the admin panel for Blogs
    fields = ['title', 'description', 'user', 'date', 'image']

# Register the Blogs model with the custom admin configuration
admin.site.register(Blogs, BlogsAdmin)
