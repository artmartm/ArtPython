from rest_framework import viewsets
from .models.models import League
from .serializers import LeagueSerializers, LeagueDetailSerializer
from django.shortcuts import render
from apps.general.models.generals import News


class LeagueViewSet(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializers
    action_to_serializer = {
        "retrieve": LeagueDetailSerializer
    }

    def get_serializer_class(self):
        return self.action_to_serializer.get(
            self.action,
            self.serializer_class
        )

def ind(request):
    n = League.objects.all()
    c = News.objects.filter(content_type=13).filter(object_id=1)
    data = {
        'n':n,
        'c':c
    }
    # content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    # object_id = models.PositiveIntegerField()
    return render(request, 'home.html', data)
    #pass