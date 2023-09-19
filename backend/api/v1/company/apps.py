# Import the AppConfig class from the django.apps module.
from django.apps import AppConfig

# Define a custom AppConfig class for the 'api.v1.company' app.
class CompanyConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'  # Set the default auto field for models.
    name = 'api.v1.company'  # Specify the name of the app (namespace).
