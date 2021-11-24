from django.shortcuts import render
from backend.apps.teams.models.models import Teams
# Create your views here.
def teams(request):
    team = Teams.objects.all()
    data = {
        'team':team
    }
    return render(request, 'teams/team.html',data)