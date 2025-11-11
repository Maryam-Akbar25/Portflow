from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def health(_request):
    return JsonResponse({"status": "ok"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health', health),
    path('api/v1/', include('users.urls')),
    path('api/v1/', include('ports.urls')),
    path('api/v1/', include('ships.urls')),
    path('api/v1/', include('operations.urls')),
    path('api/v1/', include('overrides.urls')),
    path('api/v1/', include('analytics.urls')),
    path('api/v1/', include('reports.urls')),
]