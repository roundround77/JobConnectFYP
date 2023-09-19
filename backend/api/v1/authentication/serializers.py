# Import necessary modules and classes
from rest_framework import serializers
from .models import User, User_basic_info, UserEducation, UserExperience, UserSkills
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework.authentication import authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import Util
from django.contrib.auth.hashers import make_password
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

# Serializer for user registration
class AuthenticationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True,
                                   validators=[UniqueValidator(queryset=User.objects.all(), message="This email is already taken")])
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=User.objects.all(), message="This username is already taken")])
    is_creator = serializers.BooleanField()

    class Meta:
        model = User
        fields = '__all__'

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError(
                {"password": "Password and Confirm password fields didn't match."}
            )
        return attrs

    def create(self, validated_data):
        if validated_data['is_creator']:
            print('yes')
            validated_data['is_client'] = False

        if not validated_data['is_creator']:
            print('no')
            validated_data['is_client'] = True

        print(validated_data)
        user = User.objects.create(
            email=validated_data['email'],
            password=make_password(validated_data['password']),
            username=validated_data['username'],
            is_creator=validated_data['is_creator'],
            is_client=validated_data['is_client'],
        )
        user.save()
        return user

# Serializer to get all users
class GetAllUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_staff')  # Add other fields you want to include    

# Serializer for user profile
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username']

# Serializer for change password
class UserChangePasswordSerializer(serializers.Serializer):
    password1 = serializers.CharField(style={'input_type': 'password'})
    password2 = serializers.CharField(style={'input_type': 'password'})
    password = serializers.CharField(style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['password1', 'password2', 'password']

# Serializer for send reset password email
class SendResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = User
        fields = ['email']

    def validate(self, attrs):
        email = attrs.get("email")
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            link = 'http://127.0.0.1:8000/' + uid + "/" + token
            print(link)
            body = 'click here to reset your password' + link
            data = {
                'subject': 'reset your password',
                'body': body,
                'to_email': user.email
            }
            Util.send_email(data)
            return attrs
        else:
            raise serializers.ValidationError("this email is not registered")

# Serializer for reset password
class ResetPasswordSerializer(serializers.Serializer):
    password1 = serializers.CharField(style={'input_type': 'password'})
    password2 = serializers.CharField(style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['password1', 'password2']

    def validate(self, attrs):
        try:
            password1 = attrs.get("password1")
            password2 = attrs.get("password2")
            uid = self.context.get('uid')
            token = self.context.get("token")
            if password1 != password2:
                raise serializers.ValidationError("password and confirm password are not the same")
            id = smart_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError("token is not valid or expired")
            user.set_password(password1)
            user.save()
            return attrs
        except:
            PasswordResetTokenGenerator().check_token(user, token)
            raise serializers.ValidationError("token is not valid")

# Serializer for basic details
class BasicDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_basic_info
        fields = ['first_name', 'last_name', 'phone_no', 'current_position', 'resume', 'categories', 'language', 'gender', 'date_of_birth', 'age', 'description', 'qualification', 'year_of_experience', 'your_photo', 'cover_image', 'video_profile', 'user', 'email']

# Serializer for education details
class UserEducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEducation
        fields = ['title', 'level_of_education', '_from', '_to', 'description', 'user']

# Serializer for experience details
class UserExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserExperience
        fields = ['job_title', 'company', '_from', '_to', 'description', 'user']

# Serializer for skill details
class UserSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSkills
        fields = ['user', 'skills']
