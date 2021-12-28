from rest_framework.generics import (ListCreateAPIView, RetrieveUpdateDestroyAPIView, )
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile
# from .permissions import IsOwnerProfileOrReadOnly
from .serializers import UserProfileSerializer, UserSpecialFields
from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import UsersListSerializer, UserListDetailSerializer, UserSpecialFieldsSerializer


class UsersViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class UsersSpecialFieldsViewSet(viewsets.ModelViewSet):
    queryset = UserSpecialFields.objects.all()
    serializer_class = UserSpecialFieldsSerializer


class UsersListViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsersListSerializer

    action_to_serializer = {
        "retrieve": UserListDetailSerializer
    }

    def get_serializer_class(self):
        return self.action_to_serializer.get(
            self.action,
            self.serializer_class,

        )
