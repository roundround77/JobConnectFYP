# Import necessary modules from Django.
from django.urls import path
from api.v1.company.views import UserCompany, ChangeCompanyApi  # Import views from the company app.

# Define URL patterns for the company app.
urlpatterns = [
    path('createcompany/', UserCompany.as_view()),  # Define a URL pattern for creating a company using the UserCompany view.
    path('changecompany/<pk>/', ChangeCompanyApi.as_view()),  # Define a URL pattern for changing company information using the ChangeCompanyApi view.
]
