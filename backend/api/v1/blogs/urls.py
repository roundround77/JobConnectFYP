from django.urls import path
from api.v1.blogs.views import UserBlog, ChangeBlogApi

urlpatterns = [
    path('createblog/', UserBlog.as_view()),  # Endpoint for creating a new blog
    path('changeblog/<pk>/', ChangeBlogApi.as_view()),  # Endpoint for changing an existing blog by its primary key (pk)
]
