# Import necessary modules from Django REST framework.
from rest_framework.renderers import JSONRenderer
import json

# Create a custom JSONRenderer class for rendering User data.
class UserRenderers(JSONRenderer):
    # Specify the character set for the rendered data.
    charset = 'utf-8'

    # Override the render method to customize data rendering.
    def render(self, data, accepted_media_type=None, renderer_context=None):
        response = ''  # Initialize an empty response string.

        # Check if the data contains 'ErrorDetail' (indicating an error).
        if 'ErrorDetail' in str(data):
            # Create a JSON response with an 'errors' key for error data.
            response = json.dumps({'errors': data})
        else:
            # Create a JSON response for non-error data.
            response = json.dumps(data)

        # Return the JSON response.
        return response
