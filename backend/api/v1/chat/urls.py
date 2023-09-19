# Import necessary modules from Django.
from django.urls import path
from api.v1.chat.views import UserMsg  # Import the UserMsg view from the chat app's views.

# Define URL patterns for the chat app.
urlpatterns = [
    path('createMsg/', UserMsg.as_view()),  # Define a URL pattern for creating messages using the UserMsg view.
]
