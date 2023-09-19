from rest_framework.response import Response
from .serializer import BlogSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .renderers import UserRenderers
from rest_framework.permissions import IsAuthenticated
from .models import Blogs

# jwt token
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# create blogs
class UserBlog(APIView):
    renderer_classes = [UserRenderers]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = BlogSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'success': True, 'msg': 'Your blog saved successfully'}, status=status.HTTP_201_CREATED)
      
    def get(self, request, format=None):
        data = Blogs.objects.all()
        serializer = BlogSerializer(data, many=True)
        return Response({'success': True, 'data': serializer.data, 'msg': 'All blogs are retrieved successfully'}, status=status.HTTP_200_OK)

class ChangeBlogApi(APIView):
    renderer_classes = [UserRenderers]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        data = Blogs.objects.get(pk=pk)
        serializer = BlogSerializer(data)
        return Response({'success': True, 'msg': 'Blog is retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        if request.user.is_creator:
            data = Blogs.objects.get(pk=pk)
            serializer = BlogSerializer(data, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response({'success': True, 'data': serializer.data, 'msg': 'Blog is updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False, 'msg': 'You have no authority to update this data'}, status=status.HTTP_403_FORBIDDEN)
               
    def delete(self, request, pk, format=None):
        if request.user.is_creator:
            data = Blogs.objects.get(pk=pk)
            data.delete()
            return Response({'success': True, 'msg': 'Blog is deleted successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False, 'msg': 'You have no authority to delete this data'}, status=status.HTTP_403_FORBIDDEN)
