from django.db import models
from .models import Book, Genre, Author
from django.utils.timezone import now


class CustomBookQuerySet(models.QuerySet):
    """Custom query set for book model"""

    def amount_of_book_by_author(self):  # 1
        """Amount of books which were written by particular author"""
        return Book.objects.filter(author__in=Author.objects.filter(
            name__iexact='mele')).count()

    def amount_of_en_books(self):  # 3
        """amount of english books where amount
         of pages is less 124 in particular genre"""
        return Book.objects.filter(prime_language__iexact='En').filter(
            page_count__lt=124).filter(
            name_of_genre__in=Genre.objects.filter(
                name='science')).count()
        # or name of genre ='41fd6b92-01d3-42b3-981e-a6e688133e24'

    def books_by_particular_author(self):  # 4
        """all book of particular author"""
        return Book.objects.filter(author__in=Author.objects.filter(
            name='mele')).filter(year__year__gte=2010)

    def en_books_where(self):  # 6
        """books where language is english,
        amount of pages more than 1 by author who elder than 34"""
        return Book.objects.filter(prime_language__iexact='en').filter(
            page_count__gte=1).filter(
            author__in=Author.objects.filter(
                year_of_birth__year__lte=now().year - 34))

    def query_number_7(self):  # 7
        """??? all books by genres ???"""
        return 'Slava, I cannot get what you meant'

    def books_by_author_whose_name(self):  # 8
        """all book by authors whose name starts with 'm' not elder 34"""
        return Book.objects.filter(
            author__in=Author.objects.filter(name__startswith='m').filter(
                year_of_birth__year__gte=now().year - 34))

    def amount_of_all_books(self):  # 9
        """amount of all books"""
        return Book.objects.count()

    def books_name_start_with(self):  # 10
        """amount of books that names start with 'p'"""
        return Book.objects.filter(name__startswith='p').count()

    def books_with_word_in_text(self):  # 13
        """all books that consists word 'python' in the text"""
        return Book.objects.filter(text__contains='python').count()

    def books_by_author_whose_genre_is(self):  # 14
        """all books of one year of author whose favorite genre is science"""
        return Book.objects.filter(year__year=2021).filter(
            author__in=Author.objects.filter(
                favorite_genre__in=Genre.objects.filter(name='science')))


class CustomAuthorQuerySet(models.QuerySet):
    """Custom query set for author model"""

    def authors_of_particular_genre(self):  # 5
        """all authors of particular genre"""
        return Author.objects.filter(favorite_genre__in=Genre.objects.filter(
            name='science'))
        # or favorite_genre='41fd6b92-01d3-42b3-981e-a6e688133e24'

    def amount_authors_whose_names_start_with(self):  # 11
        """amount of authors whose name starts with 'p'
         and not elder than 34"""
        return Author.objects.filter(name__startswith='P'). \
            filter(year_of_birth__year__gte=now().year - 34).count()

    def latest_authors(self):  # 12
        """5 latest authors"""
        return Author.objects.all().order_by('-created_at')[:5]


class CustomGenreQuerySet(models.QuerySet):
    """Custom query set for genre model"""

    def amount_of_genres(self):  # 2
        """amount of genres"""
        return Genre.objects.count()


"""
1. Получить количество книг, которые написал определенный автор
2. Количество жанров
3. Количество книг на английском меньше N страниц в определенном жанре
4. Все книги определенного автора, написанные позже N года
5. Всех авторов определенного жанра
6. Книги в которых язык английский, страниц больше N, всех авторов старше N
7. Все книги по жанрам
8. Все книги автора, чья фамилия начинается на N, не старше N лет (отсчитывая от now())
9. Количество всех книг
10. Количество книг, начинающихся на N
11. Количество авторов, начинающихся на N, не младше N
12. 5 самых последних авторов (по дате добавления)
13. Количество книг со словом N в тексте
14. Все книги одного года, автора определенного жанра
"""
