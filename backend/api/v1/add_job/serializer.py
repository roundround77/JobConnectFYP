# Import necessary modules from Django REST framework.
from rest_framework import serializers
from .models import AddJob

# Create a serializer class for the AddJob model.
class AddJobSerializer(serializers.ModelSerializer):
    # Define a SlugField for the 'skills' field (customize the field serialization).
    skills = serializers.SlugField()

    class Meta:
        model = AddJob  # Specify the model that this serializer is based on.
        # Define the fields to be included in the serialized representation.
        fields = [
            'id', 'closing_date', 'hiring_location', 'offered_salary', 'carrer_level',
            'qualification', 'experience', 'quantity', 'gender', 'overview',
            'skill_and_experience', 'skills', 'requirements', 'title', 'user', 'image',
            'video', 'date_posted', 'company'
        ]
