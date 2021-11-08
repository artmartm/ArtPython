from django_filters.rest_framework import NumberFilter, FilterSet
from .models import Player, Team


class ScoreFilter(FilterSet):
    min_score = NumberFilter(field_name="score", lookup_expr='gte')
    max_score = NumberFilter(field_name="score", lookup_expr='lte')

    class Meta:
        model = Player
        fields = ['score']


class Teams(FilterSet):
    amount = NumberFilter(field_name="players", lookup_expr='gte')

    class Meta:
        model = Team
        fields = ['players']
