from django.shortcuts import render
from rest_framework import filters
from rest_framework import viewsets
from .custom_permissions import OnlyLookOrAdmin
from .custom_filters import ScoreFilter
from .serializers import TeamSerializer, TeamDetailSerializer, \
    PlayerSerializer, PlayerDetailSerializer, \
    LeagueSerializer, LeagueDetailSerializer
from .models import Team, League, Player
from django_filters.rest_framework import DjangoFilterBackend


class PlayersViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]

    ordering_fields = ['weight', 'height', 'shoots', 'legionary', 'score']
    filterset_class = ScoreFilter
    search_fields = ['name', 'current_team']

    permission_classes = [OnlyLookOrAdmin]

    action_to_serializer = {
        "retrieve": PlayerDetailSerializer,
        "list": PlayerDetailSerializer,
    }

    def get_serializer_class(self):
        return self.action_to_serializer.get(
            self.action,
            self.serializer_class
        )


class LeaguesViewSet(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer
    permission_classes = [OnlyLookOrAdmin]

    action_to_serializer = {
        "retrieve": LeagueDetailSerializer
    }

    filter_backends = [filters.OrderingFilter]

    def get_serializer_class(self):
        return self.action_to_serializer.get(
            self.action,
            self.serializer_class
        )


class TeamsViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [OnlyLookOrAdmin]
    # filter_backends = [DjangoFilterBackend]
    # filterset_class = Teams
    action_to_serializer = {
        "retrieve": TeamDetailSerializer
    }

    def get_serializer_class(self):
        return self.action_to_serializer.get(
            self.action,
            self.serializer_class
        )


def index(request):
    return render(request, 'index.html')
