from django.urls import path, include
from rest_framework import routers
from apps.general.views import CommentsViewSet, NewsViewSet
from apps.leagues.views import LeagueViewSet
from apps.teams.views import StadiumViewSet, GameViewSet, TeamViewSet, clean
from apps.players.views import PlayerViewSet, PlayerMainInfoViewSet, PlayerPersonalInfoViewSet, HeadToHeadViewSet
from apps.users.views import UsersViewSet, UsersListViewSet

router = routers.DefaultRouter()
# general
router.register(r'comments', CommentsViewSet)
router.register(r'news', NewsViewSet)
# league
router.register(r'leagues', LeagueViewSet)
# player
router.register(r'head-to-head', HeadToHeadViewSet)
router.register(r'players', PlayerViewSet)
router.register(r'player-main-info', PlayerMainInfoViewSet)
router.register(r'player-personal-info', PlayerPersonalInfoViewSet)
# team
router.register(r'teams', TeamViewSet)
router.register(r'stadiums', StadiumViewSet)
router.register(r'games', GameViewSet)
# users
router.register(r'users-profile', UsersViewSet)
router.register(r'users2', UsersListViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('clean', clean),
]
