from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include, re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('apps.urls')),
    url(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),

]
