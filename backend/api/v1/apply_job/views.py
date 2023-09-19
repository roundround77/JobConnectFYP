# Import necessary modules for Django views.
from rest_framework.response import Response
from .serializer import ApplyForJobSerializer, GetJobUserSerializer, GetUserAppliedJobSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .renderers import UserRenderers
from rest_framework.permissions import IsAuthenticated
from .models import ApplyForJob
from ..authentication.models import User_basic_info
from ..authentication.serializers import BasicDetailsSerializer

# Define a function to get JWT tokens for a user.
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# Create a view for applying for a job.
class UserApplyForJob(APIView):
    renderer_classes = [UserRenderers]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        if request.user.is_client == True:
            serializer = ApplyForJobSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response({'success': True, 'msg': 'Your job application is submitted successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({"success": False, 'msg': 'You have no authority to add a job application'}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, format=None):
        data = ApplyForJob.objects.all()
        serializer = ApplyForJobSerializer(data, many=True)
        return Response({'success': True, 'data': serializer.data, 'msg': 'All job applications are retrieved successfully'}, status=status.HTTP_200_OK)

# Get details of a single user's application on a specific job.
class GetJobCandidateDetails(APIView):
    renderer_classes = [UserRenderers]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        data = ApplyForJob.objects.filter(pk=pk).first()
        serializer = GetJobUserSerializer(data, many=False)
        dataUinfo = User_basic_info.objects.filter(user=serializer.data['user']['id']).first()
        serializerUInfo = BasicDetailsSerializer(dataUinfo, many=False)
        returnData = serializer.data
        returnData['user'] = serializerUInfo.data
        returnData['username'] = serializer.data['user']['username']
        return Response({'success': True, 'msg': 'Application for the job is retrieved successfully', 'data': returnData}, status=status.HTTP_200_OK)

# Get details of all users who applied for a specific job.
class GetJobApplyUserDetails(APIView):
    renderer_classes = [UserRenderers]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        data = ApplyForJob.objects.filter(job=pk)
        serializer = GetJobUserSerializer(data, many=True)
        return Response({'success': True, 'msg': 'Applications for the job are retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

# Get all jobs applied by a user.
class GetUserAppliedJob(APIView):
    renderer_classes = [UserRenderers]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        data = ApplyForJob.objects.filter(user=request.user)
        serializer = GetUserAppliedJobSerializer(data, many=True)
        return Response({'success': True, 'msg': 'Applications for jobs are retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

# Change job application details.
class ChangeJobApplyDetails(APIView):
    renderer_classes = [UserRenderers]
    # permission_classes=[IsAuthenticated]

    def get(self, request, pk, format=None):
        data = ApplyForJob.objects.get(pk=pk)
        serializer = ApplyForJobSerializer(data)
        return Response({'success': True, 'msg': 'Job application is retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        if request.user.is_client == False:
            data = ApplyForJob.objects.get(pk=pk)
            serializer = ApplyForJobSerializer(data, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response({'success': True, 'data': serializer.data, 'msg': 'Your application is updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False, 'msg': 'You have no authority to update job application'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk, format=None):
        if request.user.is_client == True:
            data = ApplyForJob.objects.get(pk=pk)
            data.delete()
            return Response({'success': True, 'msg': 'Your application is deleted successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False, 'msg': 'You have no authority to delete job application'}, status=status.HTTP_404_NOT_FOUND)
