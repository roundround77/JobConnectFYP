from rest_framework import serializers
from .models import Blogs

# Serializer for the Blogs model
class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blogs  # Specify the model to be serialized
        fields = ['title', 'description', 'user', 'date', 'image']
