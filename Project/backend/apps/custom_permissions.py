from rest_framework import permissions
# from rest_framework.permissions import IsS
# from apps.users.models import userProfile
from apps.users.models.models import UserProfile

GENERAL_METHODS = ('GET', 'HEAD', 'OPTIONS')
COMMENT_ACCOUNT_METHODS = ('GET', 'HEAD', 'OPTIONS', 'POST')


class OnlyAdmin(permissions.BasePermission):

    def has_permission(self, request, view):
        return bool(
            request.user and request.user.is_superuser
        )


class OnlyAdminOrModerator(permissions.BasePermission):

    def has_permission(self, request, view):
        return bool(
            request.user.id and
            (request.user and (request.user.is_superuser or
                               UserProfile.objects.values_list('is_moderator', flat=True).
                               get(user=request.user.id)))
        )


class OnlyLookOrAdminModerator(permissions.BasePermission):

    def has_permission(self, request, view):
        return bool(request.method in COMMENT_ACCOUNT_METHODS or
                    request.user.id and (
                            UserProfile.objects.values_list('is_moderator', flat=True).
                            get(user=request.user.id) or
                            request.user.is_superuser)
                    )


class OnlyLookOrRequestUser(permissions.BasePermission):

    def has_permission(self, request, view):
        return bool(request.method in GENERAL_METHODS or
                    request.user.id and (
                            UserProfile.objects.values_list('is_moderator', flat=True).
                            get(user=request.user.id) or
                            request.user.is_superuser)
                    )

    def has_object_permission(self, request, view, obj):
        if request.method in COMMENT_ACCOUNT_METHODS:
            return True
        return obj.author == request.user
