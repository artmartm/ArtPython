from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from apps.users.models.models import UserProfile, UserSpecialFields
from apps.general.models.generals import Comments

GENERAL_METHODS = ('GET', 'HEAD', 'OPTIONS')
SPECIAL_METHODS = ('GET', 'HEAD', 'OPTIONS', 'POST')


class OnlyLookModeratorOrAdmin(IsAuthenticatedOrReadOnly):
    """Give permission for moderators only for look"""

    def has_object_permission(self, request, view, obj):
        attribute = ''
        if isinstance(obj, UserProfile):
            attribute = obj.user
        elif isinstance(obj, Comments):
            attribute = obj.author
        permission = bool(request.user.id and
                          ((request.user and attribute == request.user) or
                           (request.user and request.user.is_superuser) or
                           (request.user and UserSpecialFields.objects.values_list('is_moderator').
                            get(user=request.user.id))) or request.method in GENERAL_METHODS)
        return permission


class OnlyAdminOrModerator(IsAuthenticated):
    """Give permission only for moderators and admins"""

    def has_permission(self, request, view):
        return bool((request.user.is_superuser or
                     UserSpecialFields.objects.values_list('is_moderator').
                     get(user=request.user.id)))


class OnlyLookOrAdminModerator(OnlyAdminOrModerator):
    """Give permission only for moderators and admins
    and only look for authenticated users"""

    def has_permission(self, request, view):
        return bool(request.user.id and request.method in GENERAL_METHODS)


class OnlyLookOrRequestUser(IsAuthenticatedOrReadOnly):
    """Give permission for users change their informations"""

    def has_object_permission(self, request, view, obj):
        attribute = ''
        if isinstance(obj, UserProfile):
            attribute = obj.user
        elif isinstance(obj, Comments):
            attribute = obj.author
        permission = bool(request.user.id and
                          ((request.user and attribute == request.user) or
                           (request.user and request.user.is_superuser) or
                           (request.user and UserSpecialFields.objects.values_list('is_moderator').
                            get(user=request.user.id))) or request.method in GENERAL_METHODS)
        return permission
