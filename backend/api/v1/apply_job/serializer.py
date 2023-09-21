# Import necessary modules from Django REST framework.
from rest_framework import serializers
from .models import ApplyForJob
from ..add_job.serializer import AddJobSerializer
from ..authentication.models import User

# Create a serializer class for the ApplyForJob model.
class ApplyForJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplyForJob
        fields = ['id', 'date_posted', 'status', 'career_level', 'video', 'qualification', 'experience', 'skills', 'required_salary', 'user', 'job', 'description']

# Create a serializer class for CandidateUser model (User).
class CandidateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username']

# Create a serializer class for GetJobUser.
class GetJobUserSerializer(serializers.ModelSerializer):
    user = CandidateUserSerializer()  # Replace with appropriate serializer field
    class Meta:
        model = ApplyForJob
        fields = ['id', 'user', 'job', 'date_posted', 'video', 'qualification', 'experience', 'skills', 'required_salary', 'description', 'status']

# Create a serializer class for GetUserAppliedJob.
class GetUserAppliedJobSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # Replace with appropriate serializer field
    job = AddJobSerializer()
    class Meta:
        model = ApplyForJob
        fields = ['id', 'user', 'job', 'date_posted', 'qualification', 'experience', 'video', 'skills', 'required_salary', 'description', 'status']
