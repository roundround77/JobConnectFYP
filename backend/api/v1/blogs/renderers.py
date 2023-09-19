from rest_framework.renderers import JSONRenderer
import json

# Custom JSON renderer for API responses
class UserRenderers(JSONRenderer):
    # Set the character encoding to UTF-8
    charset = 'utf-8'

    def render(self, data, accepted_media_type=None, renderer_context=None):
        response = ''

        # Check if the data contains 'ErrorDetail' (indicating an error response)
        if 'ErrorDetail' in str(data):
            # Create a JSON response with 'errors' key for error messages
            response = json.dumps({'errors': data})
        else:
            # Serialize and format the data as JSON
            response = json.dumps(data)

        return response
