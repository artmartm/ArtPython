from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from apps.users.models.models import UserProfile
from apps.users.serializers import UserProfileSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        if UserProfile.objects.filter(user=user):
            token['username'] = user.username
            token['admin'] = user.is_superuser
            token['info'] = UserProfileSerializer(UserProfile.objects.filter(user=user), many=True).data[0]
        else:
            token['username'] = user.username
            token['admin'] = user.is_superuser
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
