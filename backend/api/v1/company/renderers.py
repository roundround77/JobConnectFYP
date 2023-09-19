# Import necessary modules from Django REST framework.
from rest_framework.renderers import JSONRenderer
import json

# Create a custom JSONRenderer class named UserRenderers.
class UserRenderers(JSONRenderer):
    charset = 'utf-8'  # Specify the character encoding for the response.

    def render(self, data, accepted_media_type=None, renderer_context=None):
        response = ''  # Initialize an empty response string.

        # Check if the response data contains 'ErrorDetail' (commonly used for error messages).
        if 'ErrorDetail' in str(data):
            response = json.dumps({'errors': data})  # Create a JSON response containing error information.
        else:
            response = json.dumps(data)  # Create a JSON response for other data.

        return response  # Return the JSON response.
