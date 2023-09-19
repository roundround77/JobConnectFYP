# Import necessary modules for defining URL patterns.
from django.urls import path
from api.v1.apply_job.views import (
    UserApplyForJob, ChangeJobApplyDetails, GetJobApplyUserDetails, GetJobCandidateDetails, GetUserAppliedJob
)

# Define URL patterns for the "apply_job" app views.
urlpatterns = [
    # URL pattern for applying for a job.
    path('applyjob/', UserApplyForJob.as_view(), name='apply-for-job'),

    # URL pattern for changing job application details with a dynamic primary key (pk) parameter.
    path('changeapplyjob/<pk>/', ChangeJobApplyDetails.as_view(), name='change-apply-job-details'),

    # URL pattern for getting job application details for a user with a dynamic primary key (pk) parameter.
    path('getjobuser/<pk>/', GetJobApplyUserDetails.as_view(), name='get-job-apply-user-details'),

    # URL pattern for getting candidate details for a job with a dynamic primary key (pk) parameter.
    path('getcandidate/<pk>/', GetJobCandidateDetails.as_view(), name='get-job-candidate-details'),

    # URL pattern for getting applied jobs by a user.
    path('getuserappliedjob/', GetUserAppliedJob.as_view(), name='get-user-applied-job'),
]
