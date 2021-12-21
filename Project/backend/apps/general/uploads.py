from apps.teams.models.models import Team

teams_names = []
for i in Team.objects.all():
    teams_names.append(i.name)


def get_upload_to_players(instance, name):
    return f'teams/{teams_names[int(instance.team.id) - 1]}/{instance.name}/{name}'
