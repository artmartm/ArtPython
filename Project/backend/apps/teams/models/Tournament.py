from django_tables2 import JSONColumn
from .models import Team


class Tournament(JSONColumn):
    class Meta:
        model = Team
        fields = ('sum_points', 'name')
