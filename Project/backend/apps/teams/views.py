from django.shortcuts import render

from rest_framework import viewsets
from .models.models import Team, Stadium, Game, TeamStats
from .serializers import TeamSerializers, StadiumSerializers, GameSerializers, TeamStatsSerializers, \
    TeamDetailSerializer, StadiumDetailSerializers, GameDetailSerializers
from rest_framework.permissions import IsAdminUser, IsAuthenticated


# from rest_framework.authentication import TokenAuthentication
# from rest_framework_simplejwt.authentication import TokenAuthentication
# from rest_framework.permissions import IsAuthenticated, IsAdminUser

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamDetailSerializer
    # permission_classes = [IsAdminUser]
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAdminUser]
    # def perform_authentication(self, request):
    #     user=request.user
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
    serializer_class = GameSerializers
    action_to_serializer = {
        "retrieve": GameDetailSerializers
    }

    def get_serializer_class(self):
        return self.action_to_serializer.get(
            self.action,
            self.serializer_class
        )



def clean(request):
    # t = Game.objects.all().delete()
    # data = {'t':t}
    # return render(request,'clean.html',data)
    return None

