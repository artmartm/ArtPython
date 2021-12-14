from rest_framework import viewsets
from .models import Comments, News, City, Country, Just2
from .serializers import CommentsSerializers, NewsSerializers, CitySerializers, CountrySerializers, JustSer
from apps.custom_permissions import OnlyLookOrRequestUser, OnlyLookOrAdminModerator, OnlyAdminOrModerator


class JustView(viewsets.ModelViewSet):
    queryset = Just2.objects.all()
    serializer_class = JustSer


class CommentsViewSet(viewsets.ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializers
    #permission_classes = [OnlyLookOrRequestUser]

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)
    def perform_authentication(self, request):
        user=request.user

class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializers
    #permission_classes = [OnlyAdminOrModerator]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializers
    permission_classes = [OnlyLookOrAdminModerator]


class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializers
    permission_classes = [OnlyLookOrAdminModerator]
