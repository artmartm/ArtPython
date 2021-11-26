from rest_framework import viewsets
from .models.models import Player, PlayerPersonalInfo, PlayerMainInfo
from .serializers import PlayerSerializers, PlayerPersonalInfoSerializers, PlayerMainInfoSerializers, \
    PlayerDetailSerializers


class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializers
    action_to_serializer = {
        "retrieve": PlayerDetailSerializers
    }

    def get_serializer_class(self):
        return self.action_to_serializer.get(
            self.action,
            self.serializer_class
        )


class PlayerPersonalInfoViewSet(viewsets.ModelViewSet):
    queryset = PlayerPersonalInfo.objects.all()
    serializer_class = PlayerPersonalInfoSerializers


class PlayerMainInfoViewSet(viewsets.ModelViewSet):
    queryset = PlayerMainInfo.objects.all()
    serializer_class = PlayerMainInfoSerializers
