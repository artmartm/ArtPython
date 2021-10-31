from django.db import models
import uuid
from django.utils.timezone import now


class GeneralModel(models.Model):
    """Abstract model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=30)
    created_at = models.DateTimeField(default=now)
    deleted = models.BooleanField(default=False)
    objects = models.Manager()
    my_manager = None

    def __str__(self):
        return self.name

    class Meta:
        abstract = True


class Genre(GeneralModel):
    """Child model for genres"""
    pass


class Author(GeneralModel):
    """Child model for authors"""
    year_of_birth = models.DateField()
    favorite_genre = models.ForeignKey(Genre, on_delete=models.CASCADE)


class Book(GeneralModel):
    """Child model for books"""
    name_of_genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    page_count = models.IntegerField(default=0)
    year = models.DateField(default=now)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    prime_language = models.CharField(max_length=30)
    text = models.TextField(default='There is no text yet')


from .queries import CustomQuerySet  # I know that it isn't a good thing

GeneralModel.my_manager = CustomQuerySet.as_manager()
