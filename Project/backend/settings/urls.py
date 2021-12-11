from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('api-auth/', include('rest_framework')),
    path('', include('apps.urls')),
    # path('auth/', include('djoser.urls')),
    # path('auth/', include('djoser.urls.jwt')),
    # path('auth/', include('djoser.urls.authtoken')),
    path('api2/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api2/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('chaining/', include('smart_selects.urls')),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
