from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from apps.users.models.models import UserProfile, UserSpecialFields
from apps.general.models.generals import Comments

GENERAL_METHODS = ('GET', 'HEAD', 'OPTIONS')


class OnlyLookModeratorOrAdmin(IsAuthenticated):
    """Give permission for admin and only look for moderators"""

    def has_permission(self, request, view):
        return (bool(request.user.is_superuser or (UserSpecialFields.objects.filter(
            user=request.user.id).exists() and request.method in GENERAL_METHODS)))


class OnlyLookOrAdminModerator(IsAuthenticatedOrReadOnly):
    """Give permission only for moderators and admins
    and only look for authenticated users"""

    def has_permission(self, request, view):
        return bool(request.user.is_superuser or UserSpecialFields.objects.filter(
            user=request.user.id).exists() or request.method in GENERAL_METHODS)


class OnlyLookOrRequestUser(IsAuthenticatedOrReadOnly):
    """Give permission for users change their information"""

    def has_object_permission(self, request, view, obj):
        attribute = ''
        if isinstance(obj, Comments):
            attribute = obj.author
        elif isinstance(obj, UserProfile):
            attribute = obj.user
        return bool(request.user.id and (
                (request.user and attribute == request.user) or
                (request.user and request.user.is_superuser) or
                (request.user and UserSpecialFields.objects.filter(
                    user=request.user.id).exists())) or request.method in GENERAL_METHODS)
