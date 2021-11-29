from rest_framework import viewsets
from .models.models import Team, Stadium, Game, TeamStats
from .serializers import TeamSerializers, StadiumSerializers, GameSerializers, TeamDetailSerializer
from django.shortcuts import render


def ind2(request):
    ts = Team.objects.all()
    game = Game.objects.all()
    data = {'ts': ts,
            'game': game}
    return render(request, 'ind2.html', data)


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializers

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


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializers
