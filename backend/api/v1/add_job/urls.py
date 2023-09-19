# Import necessary modules for defining URL patterns.
from django.urls import path
from api.v1.add_job.views import UserAddJob, ChangeJobApi, GetUserJobApi

# Define URL patterns for the "add_job" app views.
urlpatterns = [
    # URL pattern for creating a job.
    path('createjob/', UserAddJob.as_view(), name='create-job'),

    # URL pattern for changing a job with a dynamic primary key (pk) parameter.
    path('changejob/<pk>/', ChangeJobApi.as_view(), name='change-job'),

    # URL pattern for retrieving a user's job with a dynamic primary key (pk) parameter.
    path('getuserjob/<pk>/', GetUserJobApi.as_view(), name='get-user-job'),
]
