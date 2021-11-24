from . import views
from django.urls import path

urlpatterns = [
    path('', views.teams, name='teams')
]