from rest_framework import viewsets
from .models.models import Team, Stadium, Game
from .serializers import StadiumSerializers, \
    TeamDetailSerializer, StadiumDetailSerializers, GameDetailSerializers
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    action_to_serializer = {
        "retrieve": TeamDetailSerializer
    }

    def get_serializer_class(self):
        return self.action_to_serializer.get(
            self.action,
            self.serializer_class
        )


class StadiumViewSet(viewsets.ModelViewSet):
    queryset = Stadium.objects.all()
    serializer_class = StadiumSerializers
    action_to_serializer = {
        "retrieve": StadiumDetailSerializers
    }

    def get_serializer_class(self):
        return self.action_to_serializer.get(
            self.action,
            self.serializer_class
        )


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameDetailSerializers
    action_to_serializer = {
        "retrieve": GameDetailSerializers
    }

    def get_serializer_class(self):
        return self.action_to_serializer.get(
            self.action,
            self.serializer_class
        )
