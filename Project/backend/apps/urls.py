from django.urls import path, include
from rest_framework import routers
from apps.general.views import CommentsViewSet, NewsViewSet, CityViewSet, CountryViewSet
from apps.leagues.views import LeagueViewSet
from apps.teams.views import TeamViewSet, StadiumViewSet, GameViewSet
from apps.players.views import PlayerViewSet, PlayerMainInfoViewSet, PlayerPersonalInfoViewSet

router = routers.DefaultRouter()
# general
router.register(r'comments', CommentsViewSet)
router.register(r'news', NewsViewSet)
router.register(r'city', CityViewSet)
router.register(r'country', CountryViewSet)
# league
router.register(r'leagues', LeagueViewSet)
# player
router.register(r'player', PlayerViewSet)
router.register(r'player-main-info', PlayerMainInfoViewSet)
router.register(r'player-personal-info', PlayerPersonalInfoViewSet)
# team
router.register(r'team', TeamViewSet)
router.register(r'stadium', StadiumViewSet)
router.register(r'game', GameViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
