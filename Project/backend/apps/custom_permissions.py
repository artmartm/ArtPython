from rest_framework import permissions
#from rest_framework.permissions import IsS
# from apps.users.models import userProfile
from apps.users.models.models import UserProfile

GENERAL_METHODS = ('GET', 'HEAD', 'OPTIONS')


class OnlyLookOrAdmin(permissions.BasePermission):

    def has_permission(self, request, view):
        return bool(
            request.method in GENERAL_METHODS or
            request.user and request.user.is_superuser
        )

class OnlyLookOrAdminModerator(permissions.BasePermission):

    def has_permission(self, request, view):
        return bool(
            request.method in GENERAL_METHODS or
            request.user and UserProfile.objects.values_list('is_moderator', flat=True).
            get(user=request.user.id) or
            request.user and request.user.is_superuser
        )
