from django.urls import path
from api.v1.authentication.views import (
    GetAllUser,
    UserResetPassword,
    UserChangePassword,
    UserLogin,
    UserProfile,
    UserRegistration,
    SendResetPasswordEmail,
    UserBasicDetails,
    UserEducationDetails,
    UserExperienceDetails,
    UserSkillsDetails,
    ChangeBasicDetail,
    ChangeEducationDetail,
    ChangeExperienceDetail,
    ChangeSkillDetail,
)

urlpatterns = [
    # User Registration
    path('registration/', UserRegistration.as_view()),

    # User Login
    path('login/', UserLogin.as_view()),

    # User Profile
    path('profile/', UserProfile.as_view()),

    # Get All Users (Admin View)
    path('GetAllUser/', GetAllUser.as_view()),

    # Change User Password
    path('changepassword/', UserChangePassword.as_view()),

    # Send Reset Password Email
    path('sendresetemail/', SendResetPasswordEmail.as_view()),

    # Reset Password with UID and Token
    path('resetpassword/<uid>/<token>/', UserResetPassword.as_view()),

    # User Basic Details
    path('basicinfo/', UserBasicDetails.as_view()),

    # Change User Basic Details
    path('changebasicinfo/', ChangeBasicDetail.as_view()),

    # User Education Details
    path('educationinfo/', UserEducationDetails.as_view()),

    # Change User Education Details
    path('changeeducationinfo/<pk>/', ChangeEducationDetail.as_view()),

    # User Experience Details
    path('experienceinfo/', UserExperienceDetails.as_view()),

    # Change User Experience Details
    path('changeexperienceinfo/<pk>/', ChangeExperienceDetail.as_view()),

    # User Skills Details
    path('skillinfo/', UserSkillsDetails.as_view()),

    # Change User Skills Details
    path('changeskillinfo/<pk>/', ChangeSkillDetail.as_view()),
]
