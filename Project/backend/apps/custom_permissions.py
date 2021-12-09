from rest_framework import permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from apps.users.models.models import UserProfile

GENERAL_METHODS = ('GET', 'HEAD', 'OPTIONS')


class OnlyAdminOrModerator(IsAuthenticated):

    def has_permission(self, request, view):
        return bool((request.user.is_superuser or
                     UserProfile.objects.values_list('is_moderator', flat=True).
                     get(user=request.user.id)))


class OnlyLookOrAdminModerator(OnlyAdminOrModerator):

    def has_permission(self, request, view):
        return bool(request.user.id and request.method in GENERAL_METHODS)


class OnlyLookOrRequestUser(IsAuthenticatedOrReadOnly):

    def has_object_permission(self, request, view, obj):
        permission = bool((request.user and obj.author == request.user) or
                          (request.user and request.user.is_superuser))
        return permission
