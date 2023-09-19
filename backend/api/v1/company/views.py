# Import necessary modules from Django REST framework.
from rest_framework.response import Response
from .serializer import CompanySerializer  # Import the CompanySerializer from the current application's serializers.
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .renderers import UserRenderers  # Import the custom UserRenderers class.
from rest_framework.permissions import IsAuthenticated
from .models import Company  # Import the Company model from the current application's models.

# Create your views here.

# jwt token
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# Create a view for creating and listing companies.
class UserCompany(APIView):
    renderer_classes = [UserRenderers]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        if request.user:
            serializer = CompanySerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response({'success': True, 'msg': 'Your company has been saved successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({"success": False, 'msg': 'You have no authority to add data'}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, format=None):
        companies = Company.objects.all()
        company_data = []  # List to hold serialized data with pk values

        for company in companies:
            serializer = CompanySerializer(company)
            company_data.append({'id': company.pk, 'data': serializer.data})

        return Response({
            'success': True,
            'data': company_data,
            'msg': 'All companies are retrieved successfully'
        }, status=status.HTTP_200_OK)

# Create a view for changing company information.
class ChangeCompanyApi(APIView):
    renderer_classes = [UserRenderers]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, format=None):
        data = Company.objects.get(pk=pk)
        serializer = CompanySerializer(data)
        return Response({'success': True, 'msg': 'Company data is retrieved successfully', 'data': serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        if request.user.is_creator == True:
            data = Company.objects.get(pk=pk)
            serializer = CompanySerializer(data, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response({'success': True, 'data': serializer.data, 'msg': 'Company data is updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False, 'msg': 'You have no authority to update data'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk, format=None):
        if request.user.is_creator == True:
            data = Company.objects.get(pk=pk)
            data.delete()
            return Response({'success': True, 'msg': 'Company data is deleted successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False, 'msg': 'You have no authority to delete data'}, status=status.HTTP_404_NOT_FOUND)
