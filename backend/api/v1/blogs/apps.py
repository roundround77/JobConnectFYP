from django.apps import AppConfig

# Configuration class for the 'Blogs' app
class BlogsConfig(AppConfig):
    # Set the default auto field for models in this app
    default_auto_field = 'django.db.models.BigAutoField'
    # Name of the app
    name = 'api.v1.blogs'
