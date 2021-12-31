from rest_framework import viewsets
from .models import League
from .serializers import LeagueSerializers, LeagueDetailSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class LeagueViewSet(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializers
    permission_classes = [IsAuthenticatedOrReadOnly]

    action_to_serializer = {
        "retrieve": LeagueDetailSerializer
    }

    def get_serializer_class(self):
        return self.action_to_serializer.get(
            self.action,
            self.serializer_class
        )
