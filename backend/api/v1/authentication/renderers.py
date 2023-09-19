# Import necessary modules from Django REST framework.
from rest_framework.renderers import JSONRenderer
import json

# Create a custom JSONRenderer class called UserRenderers.
class UserRenderers(JSONRenderer):
    # Specify the character set for encoding the JSON data.
    charset = 'utf-8'

    # Override the render method to customize JSON rendering.
    def render(self, data, accepted_media_type=None, renderer_context=None):
        response = ''  # Initialize an empty string for the response.

        # Check if the data contains 'ErrorDetail' (usually indicating an error response).
        if 'ErrorDetail' in str(data):
            response = json.dumps({'errors': data})  # Create a JSON response with 'errors' key.
        else:
            response = json.dumps(data)  # Convert the data to a JSON response.

        return response  # Return the JSON response.
