from rest_framework import viewsets
from .models.models import Team, Stadium, Game, TeamStats
from .serializers import TeamSerializers, StadiumSerializers, GameSerializers, TeamStatsSerializers, \
    TeamDetailSerializer, StadiumDetailSerializers, GameDetailSerializers
from apps.custom_permissions import OnlyLookOrAdminModerator
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]

    return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTeams(request):
    user = request.user
    #notes = user.note_set.all()
    serializer = TeamSerializers(many=True)
    return Response(serializer.data)

# class TeamViewSet(viewsets.ModelViewSet):
#     queryset = Team.objects.all()
#     serializer_class = TeamSerializers
#     permission_classes = [IsAdminUser]
#
#     def perform_authentication(self, request):
#         user=request.user
#     action_to_serializer = {
#         "retrieve": TeamDetailSerializer
#     }
#
#     def get_serializer_class(self):
#         return self.action_to_serializer.get(
#             self.action,
#             self.serializer_class
#         )


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
