from django.urls import path, include
from rest_framework import routers
from apps.general.views import CommentsViewSet, NewsViewSet, CityViewSet, CountryViewSet
from apps.leagues.views import LeagueViewSet
from apps.teams.views import TeamViewSet, StadiumViewSet, GameViewSet, ind2
from apps.players.views import PlayerViewSet, PlayerMainInfoViewSet, PlayerPersonalInfoViewSet
from apps.users.views import UserProfileListCreateView, userProfileDetailView
router = routers.DefaultRouter()
# general
router.register(r'comments', CommentsViewSet)
router.register(r'news', NewsViewSet)
router.register(r'cities', CityViewSet)
router.register(r'countries', CountryViewSet)
# league
router.register(r'leagues', LeagueViewSet)
# player
router.register(r'players', PlayerViewSet)
router.register(r'player-main-info', PlayerMainInfoViewSet)
router.register(r'player-personal-info', PlayerPersonalInfoViewSet)
# team
router.register(r'teams', TeamViewSet)
router.register(r'stadiums', StadiumViewSet)
router.register(r'games', GameViewSet)
# users


urlpatterns = [
    path('api/', include(router.urls)),
    path("all-profiles", UserProfileListCreateView.as_view(), name="list_of_progiles"),
    path("profile/<int:pk>", userProfileDetailView.as_view(), name="profile"),
]
