# Import necessary modules from Django REST framework.
from rest_framework import serializers
from .models import Company  # Import the Company model from the current application's models.

# Create a serializer class for the Company model.
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company  # Specify the model to be serialized.
        fields = ['user', 'company_name', 'overview', 'jobs', 'category', 'company_size', 'founded_in', 'location', 'phone', 'email']
        # Define the fields from the Company model to be included in the serialization.
