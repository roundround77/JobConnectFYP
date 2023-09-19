# Import the AppConfig class from Django.
from django.apps import AppConfig

# Create a custom configuration class for your "authentication" app.
class AuthenticationConfig(AppConfig):
    # Define the default auto field for models within this app.
    default_auto_field = 'django.db.models.BigAutoField'

    # Specify the name of the app.
    name = 'api.v1.authentication'
