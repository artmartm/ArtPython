from django.db import models
from .models import Book, Genre, Author
from django.utils.timezone import now


class CustomBookQuerySet(models.QuerySet):
    """Custom query set for book model"""

    def amount_of_book_by_author(self, author_name):  # 1
        """amount of books which were written by particular author"""
        return Book.objects.filter(author__in=Author.objects.filter(
            name__iexact=author_name)).count()

    def amount_of_en_books(self, language, amount_of_pages, genre):  # 3
        """amount of books which were written in certain language,
         where pages are less than a certain amount in particular genre"""
        return Book.objects.filter(prime_language__iexact=language).filter(
            page_count__lt=amount_of_pages).filter(
            genre__in=Genre.objects.filter(
                name=genre)).count()
        # or name of genre ='41fd6b92-01d3-42b3-981e-a6e688133e24'

    def books_by_particular_author(self, author, year):  # 4
        """amount of books which were written in certain language
        and after a certain ages"""
        return Book.objects.filter(author__in=Author.objects.filter(
            name=author)).filter(year__year__gte=year)

    def en_books_where(self, language, pages, ages):  # 6
        """books which were written in a certain language, where
        amount of pages more than particular number and
        author is elder than a certain ages"""
        return Book.objects.filter(prime_language__iexact=language).filter(
            page_count__gte=pages).filter(
            author__in=Author.objects.filter(
                year_of_birth__year__lte=now().year - ages))

    def query_number_7(self):  # 7
        """??? all books by genres ???"""
        return 'Slava, I cannot get what you meant'

    def books_by_author_whose_name(self, first_letter, ages):  # 8
        """all book by authors whose name starts with particular letter
         and not elder than particular ages"""
        return Book.objects.filter(
            author__in=Author.objects.filter(name__startswith=first_letter).filter(
                year_of_birth__year__gte=now().year - ages))

    def amount_of_all_books(self):  # 9
        """amount of all books"""
        return Book.objects.count()

    def books_name_start_with(self, first_letter):  # 10
        """amount of books that names start with particular letter"""
        return Book.objects.filter(name__startswith=first_letter).count()

    def books_with_word_in_text(self, word):  # 13
        """all books that consists particular word in the text"""
        return Book.objects.filter(text__contains=word).count()

    def books_by_author_whose_genre_is(self, year, genre):  # 14
        """all books of one year of author who has particular genre"""
        return Book.objects.filter(year__year=year).filter(
            author__in=Author.objects.filter(
                genre__in=Genre.objects.filter(name=genre)))


class CustomAuthorQuerySet(models.QuerySet):
    """Custom query set for author model"""

    def authors_of_particular_genre(self, genre):  # 5
        """all authors of particular genre"""
        return Author.objects.filter(genre__in=Genre.objects.filter(
            name=genre))

    def amount_authors_whose_names_start_with(self, first_letter, ages):  # 11
        """amount of authors whose name starts with particular letter
         and not elder than particular ages"""
        return Author.objects.filter(name__startswith=first_letter). \
            filter(year_of_birth__year__gte=now().year - ages).count()

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
