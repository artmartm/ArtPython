from rest_framework.generics import (ListCreateAPIView, RetrieveUpdateDestroyAPIView, )
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile
# from .permissions import IsOwnerProfileOrReadOnly
from .serializers import UserProfileSerializer
from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import UsersListSerializer


class UsersViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class UsersListViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsersListSerializer
