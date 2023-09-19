from rest_framework.response import Response
from rest_framework import status
from .serializers import GetAllUserSerializer, AuthenticationSerializer, UserProfileSerializer, UserChangePasswordSerializer, SendResetEmailSerializer, ResetPasswordSerializer, BasicDetailsSerializer, UserEducationSerializer, UserExperienceSerializer, UserSkillSerializer
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.authentication import authenticate
from .renderers import UserRenderers
from rest_framework.permissions import IsAuthenticated
from .models import User_basic_info, UserEducation, UserExperience, UserSkills
from .models import User, User_basic_info
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.http import JsonResponse

# JWT token generation function
def get_tokens_for_user(user):
    """
    Generates JWT tokens for a given user.

    Args:
        user (User): User object for which tokens need to be generated.

    Returns:
        dict: Dictionary containing 'refresh' and 'access' tokens.
    """
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# User registration
class UserRegistration(APIView):
    renderer_classes=[UserRenderers]
    def post(self, request, format=None):
        serializer = AuthenticationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        user_obj = {
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'is_creator': user.is_creator,
            'is_client': user.is_client
        }
        return Response({"success": True, "user": user_obj, 'msg': 'user is registered successfully', 'token': token}, status=status.HTTP_201_CREATED)

# User login
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['is_admin'] = user.is_admin,
        token['is_creator'] = user.is_creator,
        token['is_client'] = user.is_client,
        token['id'] = user.id
        return token

    def validate(self, attrs):
        try:
            password = attrs.get("password")
            user_obj = User.objects.get(email=attrs.get('email'))

            if user_obj is not None:
                credentials = {
                    'email': user_obj.email,
                    'password': password
                }
                if all(credentials.values()):
                    if user := authenticate(**credentials):

                        if user.is_account_suspended:
                            msg = 'Your account is suspended.'
                            return {"success": False, "message": msg}

                        refresh = self.get_token(user)
                        data = {'refresh': str(refresh), 'access': str(refresh.access_token)}
                        users_roles = AuthenticationSerializer(user).data

                        try:
                            user_details = User_basic_info.objects.get(
                                user=user)
                        except Exception as e:
                            print(e)
                            user_details = None
                        if user_details is None:
                            user_details = {}
                        else:
                            user_details = BasicDetailsSerializer(
                                user_details).data
                        if users_roles:
                            del users_roles['groups']
                            del users_roles['user_permissions']
                            del users_roles['last_login']
                        return {"success": True, "message": "Login successful", "data": data, "user_roles": users_roles, "user_details": user_details}
                    else:
                        msg = 'Unable to log in with provided credentials.'
                        return {
                            "success": False,
                            "message": msg
                        }
                else:
                    msg = 'Must include email or username and "password".'
                    msg = msg.format(username_field=self.username_field)
                    raise {
                        "success": False,
                        "message": msg
                    }
            else:
                msg = 'Account with this email/username does not exist'
                return {
                    "success": False,
                    "message": msg
                }
        except Exception as e:
            return {
                "success": False,
                "message": "Incorrect username or password",
            }

class UserLogin(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Get All users
class GetAllUser(APIView):
    renderer_classes=[UserRenderers]
    permission_classes=[IsAuthenticated]
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = GetAllUserSerializer(users, many=True)
        return Response({"success": True, "data": serializer.data}, status=status.HTTP_200_OK)

# User's profile
class UserProfile(APIView):
    renderer_classes=[UserRenderers]
    permission_classes=[IsAuthenticated]
    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response({"success": True, "data": serializer.data}, status=status.HTTP_200_OK)

# User change password
class UserChangePassword(APIView):
    renderer_classes=[UserRenderers]
    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        password = serializer.data.get('password')
        password1 = serializer.data.get('password1')
        password2 = serializer.data.get('password2')
        email = request.user.email
        user = authenticate(email=email, password=password)
        if user is not None:
            password1 = serializer.data.get('password1')
            password2 = serializer.data.get('password2')
            if password1 != password2:
                return Response({'msg': 'password and confirm password are not the same'})
            else:
                user.set_password(password1)
                user.save()
                return Response({"success": True, 'msg': 'password is changed successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'old password is not correct'})

# Send reset password email
class SendResetPasswordEmail(APIView):
    renderer_classes=[UserRenderers]
    permission_classes=[IsAuthenticated]
    def post(self, request, format=None):
        serializer = SendResetEmailSerializer(data=request.data, context={'user': request.user})
        serializer.is_valid(raise_exception=True)
        return Response({'msg': 'password reset link is sent to your email, please check your email'}, status=status.HTTP_200_OK)

# User reset password
class UserResetPassword(APIView):
    def post(self, request, uid, token, **kwargs):
       serializer = ResetPasswordSerializer(data=request.data, context={'uid': uid, 'token': token})
       serializer.is_valid(raise_exception=True)
       return Response({"success": True, 'msg': 'password is set successfully'}, status=status.HTTP_200_OK)

# User basic details
class UserBasicDetails(APIView):
    renderer_classes=[UserRenderers]
    # permission_classes=[IsAuthenticated]
    def post(self, request, format=None):
        serializer = BasicDetailsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            data = serializer.data
            return Response({'success': True, 'msg': 'user basic info is saved successfully', 'data': data}, status=status.HTTP_201_CREATED)

    def get(self, request, format=None):
        data = User_basic_info.objects.all()
        serializer = BasicDetailsSerializer(data, many=True)
        return Response({'success': True, 'data': serializer.data, 'msg': 'all basic info are get successfully'}, status=status.HTTP_200_OK)

class ChangeBasicDetail(APIView):
    renderer_classes=[UserRenderers]
    permission_classes=[IsAuthenticated]
    def get(self, request, format=None):
        data = User_basic_info.objects.filter(email=request.user.email).first()

        if data:
            serializer = BasicDetailsSerializer(data)
            return Response({'success': True, 'msg': 'basic info is get successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        else:
            new_data = {"user": request.user.id, "email": request.user.email}
            serializer = BasicDetailsSerializer(data=new_data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()

            return Response({'success': True, 'msg': 'basic info is get successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, format=None):
        data = User_basic_info.objects.filter(email=request.user.email).first()
        serializer = BasicDetailsSerializer(data, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'success': True, 'data': serializer.data, 'msg': 'basic info is updated successfully'}, status=status.HTTP_200_OK)

    def delete(self, request, pk, format=None):
        data = User_basic_info.objects.get(pk=pk)
        data.delete()
        return Response({'success': True, 'msg': 'basic info is deleted successfully'}, status=status.HTTP_200_OK)

# User education details
class UserEducationDetails(APIView):
    renderer_classes=[UserRenderers]
    permission_classes=[IsAuthenticated]
    def post(self, request, format=None):
        serializer = UserEducationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'success': True, 'msg': 'user education info is saved successfully'}, status=status.HTTP_201_CREATED)

    def get(self, request, format=None):
        data = UserEducation.objects.all()
        serializer = UserEducationSerializer(data, many=True)
        return Response({'success': True, 'data': serializer.data, 'msg': 'all education info are get successfully'}, status=status.HTTP_200_OK)

class ChangeEducationDetail(APIView):
    renderer_classes=[UserRenderers]
    permission_classes=[IsAuthenticated]
    def get(self, request, pk, format=None):
        data = UserEducation.objects.get(pk=pk)
        serializer = UserEducationSerializer(data)
        return Response({'success': True, 'msg': 'user education info is get successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        data = UserEducation.objects.get(pk=pk)
        serializer = UserEducationSerializer(data, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'success': True, 'data': serializer.data, 'msg': 'user education info is updated successfully'}, status=status.HTTP_200_OK)

    def delete(self, request, pk, format=None):
        data = UserEducation.objects.get(pk=pk)
        data.delete()
        return Response({'success': True, 'msg': 'user education info is deleted successfully'}, status=status.HTTP_200_OK)

# User experience details
class UserExperienceDetails(APIView):
    renderer_classes=[UserRenderers]
    permission_classes=[IsAuthenticated]
    def post(self, request, format=None):
        serializer = UserExperienceSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'success': True, 'msg': 'user experience info is saved successfully'}, status=status.HTTP_201_CREATED)

    def get(self, request, format=None):
        data = UserExperience.objects.all()
        serializer = UserExperienceSerializer(data, many=True)
        return Response({'success': True, 'data': serializer.data, 'msg': 'all experience info are get successfully'}, status=status.HTTP_200_OK)

class ChangeExperienceDetail(APIView):
    renderer_classes=[UserRenderers]
    permission_classes=[IsAuthenticated]
    def get(self, request, pk, format=None):
        data = UserExperience.objects.get(pk=pk)
        serializer = UserExperienceSerializer(data)
        return Response({'success': True, 'msg': 'user experience info is get successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        data = UserExperience.objects.get(pk=pk)
        serializer = UserExperienceSerializer(data, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'success': True, 'data': serializer.data, 'msg': 'user experience info is updated successfully'}, status=status.HTTP_200_OK)

    def delete(self, request, pk, format=None):
        data = UserExperience.objects.get(pk=pk)
        data.delete()
        return Response({'success': True, 'msg': 'user experience info is deleted successfully'}, status=status.HTTP_200_OK)

# User skills details
class UserSkillsDetails(APIView):
    renderer_classes=[UserRenderers]
    permission_classes=[IsAuthenticated]
    def post(self, request, format=None):
        serializer = UserSkillSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'success': True, 'msg': 'user skill info is saved successfully'}, status=status.HTTP_201_CREATED)

    def get(self, request, format=None):
        data = UserSkills.objects.all()
        serializer = UserSkillSerializer(data, many=True)
        return Response({'success': True, 'data': serializer.data, 'msg': 'all skills info are get successfully'}, status=status.HTTP_200_OK)

class ChangeSkillDetail(APIView):
    renderer_classes=[UserRenderers]
    permission_classes=[IsAuthenticated]
    def get(self, request, pk, format=None):
        data = UserSkills.objects.get(pk=pk)
        serializer = UserSkillSerializer(data)
        return Response({'success': True, 'msg': 'user skill info is get successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        data = UserSkills.objects.get(pk=pk)
        serializer = UserSkillSerializer(data, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'success': True, 'data': serializer.data, 'msg': 'user skill info is updated successfully'}, status=status.HTTP_200_OK)

    def delete(self, request, pk, format=None):
        data = UserSkills.objects.get(pk=pk)
        data.delete()
        return Response({'success': True, 'msg': 'user skill info is deleted successfully'}, status=status.HTTP_200_OK)
