# Import necessary modules from Django.
from django.db import models
from api.v1.authentication.models import User  # Import the User model from the authentication app.

# Create your models here.

# Define a model named MsgModel to represent chat messages.
class MsgModel(models.Model):
    senderUser = models.ForeignKey(User, on_delete=models.CASCADE, related_name='main_user')  # Define a ForeignKey for the senderUser.
    recieverUser = models.ForeignKey(User, on_delete=models.CASCADE, related_name='second_user')  # Define a ForeignKey for the recieverUser.
    msg = models.CharField(max_length=100)  # Define a field to store the message text.

    created_at = models.DateTimeField(auto_now_add=True)  # Store the creation date and time.
    updated_at = models.DateTimeField(auto_now=True)  # Store the last update date and time.
