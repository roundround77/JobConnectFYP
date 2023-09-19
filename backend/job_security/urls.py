from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/',include('api.v1.authentication.urls')),
    path('blog/',include('api.v1.blogs.urls')),
    path('addjob/',include('api.v1.add_job.urls')),
    path('chat/',include('api.v1.chat.urls')),
    path('jobapply/',include('api.v1.apply_job.urls')),
    path('company/',include('api.v1.company.urls')),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
