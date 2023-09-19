# Import necessary modules from Django REST framework.
from rest_framework import serializers
from .models import MsgModel  # Import the MsgModel model from the current application's models.

# Create a serializer class for the MsgModel model.
class MsgSerializer(serializers.ModelSerializer):
    class Meta:
        model = MsgModel  # Specify the model to be serialized.
        fields = "__all__"  # Serialize all fields of the MsgModel model.
