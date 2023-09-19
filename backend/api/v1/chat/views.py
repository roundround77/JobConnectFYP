# Import necessary modules from Django REST framework.
from rest_framework.response import Response
from .serializers import MsgSerializer  # Import the MsgSerializer from the current application's serializers.
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .models import MsgModel  # Import the MsgModel model from the current application's models.

# Create your views here.

# Define a view for handling user messages.
class UserMsg(APIView):
    permission_classes = [IsAuthenticated]  # Set the permission class to require authentication.

    def post(self, request, format=None):
        # Create a serializer for the incoming data.
        serializer = MsgSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'success': True, 'msg': 'Your message has been saved successfully'}, status=status.HTTP_201_CREATED)
        
    def get(self, request, format=None):
        # Retrieve all messages from the database.
        data = MsgModel.objects.all()
        # Serialize the data.
        serializer = MsgSerializer(data, many=True)
        return Response({'success': True, 'data': serializer.data, 'msg': 'All messages have been retrieved successfully'}, status=status.HTTP_200_OK)
