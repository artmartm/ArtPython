from .models import UserProfile
from .serializers import UserProfileSerializer, UserSpecialFields
from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import UsersListSerializer, UserListDetailSerializer, UserSpecialFieldsSerializer
from apps.custom_permissions import OnlyLookOrRequestUser, OnlyLookModeratorOrAdmin


class UsersViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [OnlyLookOrRequestUser]


class UsersSpecialFieldsViewSet(viewsets.ModelViewSet):
    queryset = UserSpecialFields.objects.all()
    serializer_class = UserSpecialFieldsSerializer
    permission_classes = [OnlyLookModeratorOrAdmin]


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
