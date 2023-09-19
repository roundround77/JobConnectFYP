# Import necessary modules for Django views.
from rest_framework.response import Response
from .serializer import AddJobSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .renderers import UserRenderers
from rest_framework.permissions import IsAuthenticated
from .models import AddJob

# Define a function to get JWT tokens for a user.
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# Create a view for adding a job.
class UserAddJob(APIView):
    renderer_classes = [UserRenderers]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        if request.user:
            # Check if the user is authenticated and authorized to create a job.
            serializer = AddJobSerializer(data=request.data, context={'user': request.user})
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response({'success': True, 'msg': 'Your job is saved successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({"success": False, 'msg': 'You have no authority to add data'}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, format=None):
        # Get all jobs and serialize them.
        data = AddJob.objects.all()
        serializer = AddJobSerializer(data, many=True)
        return Response({'success': True, 'data': serializer.data, 'msg': 'All jobs are retrieved successfully'}, status=status.HTTP_200_OK)

# Get jobs by user.
class GetUserJobApi(APIView):
    renderer_classes = [UserRenderers]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        user = request.user
        data = AddJob.objects.filter(user=user)
        serializer = AddJobSerializer(data, many=True)
        return Response({'success': True, 'msg': 'Jobs are retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

# Update job.
class ChangeJobApi(APIView):
    renderer_classes = [UserRenderers]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        data = AddJob.objects.get(pk=pk)
        serializer = AddJobSerializer(data)
        return Response({'success': True, 'msg': 'Job is retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        if request.user.is_creator == True:
            data = AddJob.objects.get(pk=pk)
            serializer = AddJobSerializer(data, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response({'success': True, 'data': serializer.data, 'msg': 'Job is updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False, 'msg': 'You have no authority to update data'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk, format=None):
        if request.user.is_creator == True:
            data = AddJob.objects.get(pk=pk)
            data.delete()
            return Response({'success': True, 'msg': 'Job is deleted successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False, 'msg': 'You have no authority to delete data'}, status=status.HTTP_404_NOT_FOUND)
