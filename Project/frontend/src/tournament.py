# model
import django_tables2
from django_tables2 import JSONColumn

class Table(django_tables2.JSONColumn):
    class Meta:
        model = Just2
        #teamplate_name="django_tables2/bootstrap.html"
        fields = ('points','name')


#ser
class TableSerializer(serializers.ModelSerializer):
    class Meta(Table.Meta):
        exclude = ()
        # fields = '__all__'
        # model = Tab

#vie
from django_tables2 import SingleTableView
from .models import Table
class PersonListView(SingleTableView):
    model = Just2
    table_class = Table
    template_name = 'table.html'

class TableView(viewsets.ModelViewSet):
    queryset = Table.Meta.model.objects.all()
    serializer_class = TableSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['points']
    ordering_fields = ['points']
#url
router.register(r'table', TableView)
