from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from apps.users.models.models import UserProfile, UserSpecialFields
from apps.users.serializers import UserProfileSerializer, UserSpecialFieldsSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['admin'] = user.is_superuser
        if UserProfile.objects.filter(user=user):
            token['info'] = UserProfileSerializer(UserProfile.objects.filter(user=user), many=True).data[0]
        if UserSpecialFields.objects.filter(user=user):
            token['moderator'] = \
            UserSpecialFieldsSerializer(UserSpecialFields.objects.filter(user=user), many=True).data[0]
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
