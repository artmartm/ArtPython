from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from apps.users.models.models import UserProfile
from apps.users.serializers import UserProfileSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['info'] = UserProfileSerializer(UserProfile.objects.filter(user=user), many=True).data[0]
        #GameSerializers(Game.objects.filter(home_team=team), many=True).data
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
