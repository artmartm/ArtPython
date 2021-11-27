from .models.models import League
from rest_framework import serializers
# from settings.apps.teams.serializers import TeamSerializers
from apps.teams.models.models import Team
from apps.teams.serializers import TeamSerializers


class LeagueSerializers(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = '__all__'


class LeagueDetailSerializer(LeagueSerializers):
    teams = serializers.SerializerMethodField()

    @staticmethod
    def get_teams(league):
        """return nested list of teams for the league"""
        teams = TeamSerializers(Team.objects.filter(league=league), many=True).data
        return teams
