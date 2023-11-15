"""
URL configuration for petpal project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Reference: https://drf-yasg.readthedocs.io/en/stable/readme.html
schema_view = get_schema_view(
   openapi.Info(
      title="PetPal API",
      default_version='v1',
      description="Documentation for PetPal REST API",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('docs/', schema_view.with_ui('redoc', cache_timeout=0)),
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('applications/', include('applications.urls')),
    path('pets/', include('pets.urls')),
    path('notifications/', include('notifications.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
