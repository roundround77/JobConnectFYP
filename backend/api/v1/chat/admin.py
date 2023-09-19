# Import necessary modules from Django.
from django.contrib import admin
from .models import MsgModel  # Import the MsgModel model from your application's models.

# Register your models here.

# Define an admin class for the MsgModel model.
class MsgAdmin(admin.ModelAdmin):
    model = MsgModel  # Specify the model to be associated with this admin class.
    fields = ['senderUser', "recieverUser", "msg"]  # Define the fields to be displayed in the admin panel.

# Register the MsgModel model with the MsgAdmin class, allowing it to be managed in the admin panel.
admin.site.register(MsgModel, MsgAdmin)
