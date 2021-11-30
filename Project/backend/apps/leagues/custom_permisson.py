from rest_framework import permissions
from apps.users.models.models import userProfile

GENERAL_METHODS = ('GET', 'HEAD', 'OPTIONS')
MODERATOR_METHODS = ('GET', 'HEAD', 'OPTIONS')
AUTHOR_METHODS = ('GET', 'HEAD', 'OPTIONS')


class OnlyLookOrAdmin(permissions.BasePermission):

    def has_permission(self, request, view):
        return bool(
            request.method in GENERAL_METHODS or
            request.user and
            request.user.is_superuser #or
            # request.user and
            # userProfile.objects.values_list('is_moderator', flat=True).get(user=request.user.id)
        )
