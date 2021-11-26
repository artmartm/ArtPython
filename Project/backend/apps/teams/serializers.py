from .models.models import Team, Stadium, Game
from rest_framework import serializers
from apps.players.models.models import Player
from apps.players.serializers import PlayerSerializers


class TeamSerializers(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'


class StadiumSerializers(serializers.ModelSerializer):
    class Meta:
        model = Stadium
        fields = '__all__'


class GameSerializers(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'


### DETAIALS


class TeamDetailSerializer(TeamSerializers):
    players = serializers.SerializerMethodField()

    @staticmethod
    def get_players(team):
        """return nested list of teams for the league"""

        players = PlayerSerializers(Player.objects.filter(team=team), many=True).data
        return [player['name'] for player in players]
