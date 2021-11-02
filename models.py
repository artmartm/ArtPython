from django.db import models
import uuid
from django.utils.timezone import now
from django.core.validators import MaxValueValidator
from datetime import date


class SoftDeletedModel(models.Model):
    """Abstract soft deleted model"""
    deleted = models.BooleanField(default=False)

    class Meta:
        abstract = True


class CreatedAtModel(models.Model):
    """Abstract created at model"""
    created_at = models.DateTimeField(default=now, validators=[MaxValueValidator(limit_value=now)])

    class Meta:
        abstract = True


class GeneralFieldsModel(models.Model):
    """Abstract model with general fields"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=30)
    objects = models.Manager()

    def __str__(self):
        return self.name

    class Meta:
        abstract = True


class Genre(CreatedAtModel, SoftDeletedModel, GeneralFieldsModel):
    """Child model for genres"""
    pass


class Author(CreatedAtModel, SoftDeletedModel, GeneralFieldsModel):
    """Child model for authors"""
    year_of_birth = models.DateField(validators=[MaxValueValidator(limit_value=date.today)])
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)


class Book(CreatedAtModel, SoftDeletedModel, GeneralFieldsModel):
    """Child model for books"""
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    page_count = models.IntegerField(default=0)
    year = models.DateField(default=now, validators=[MaxValueValidator(limit_value=date.today)])
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    prime_language = models.CharField(max_length=30)
    text = models.TextField(default='There is no text yet')


from .queries import CustomBookQuerySet, CustomAuthorQuerySet, CustomGenreQuerySet  # I know that it isn't a good thing

Book.my_manager = CustomBookQuerySet.as_manager()
Author.my_manager = CustomAuthorQuerySet.as_manager()
Genre.my_manager = CustomGenreQuerySet.as_manager()
