from .models import League, Player, Team
from rest_framework import serializers


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'


class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = '__all__'


class PlayerDetailSerializer(serializers.ModelSerializer):
    current_team = TeamSerializer()

    class Meta:
        model = Player
        fields = '__all__'


class TeamDetailSerializer(TeamSerializer):
    players = serializers.SerializerMethodField()
    league = LeagueSerializer()

    @staticmethod
    def get_players(team):
        """return nested list of players for the team"""
        players = PlayerSerializer(Player.objects.filter(current_team=team), many=True).data
        return [player['name'] for player in players]


class LeagueDetailSerializer(LeagueSerializer):
    teams = serializers.SerializerMethodField()

    @staticmethod
    def get_teams(league):
        """return nested list of teams for the league"""

        teams = TeamDetailSerializer(Team.objects.filter(league=league), many=True).data
        list_of_teams = [team['name'] for team in teams]
        return list_of_teams
