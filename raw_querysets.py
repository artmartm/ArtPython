from django.db import models
from .models import Book, Genre, Author


class RawCustomBookQuerySet(models.QuerySet):
    """Custom query set for book model"""

    def amount_of_book_by_author(self):  # 1
        """Amount of books which were written by particular author"""
        return len(Book.objects.raw('SELECT * FROM main_book '
                                    'INNER JOIN main_author ON '
                                    'main_book.author_id = main_author.id  '
                                    'WHERE main_author.name = "Mele"'))

    def amount_of_en_books(self):  # 3
        """amount of english books where amount
         of pages is less 124 in particular genre"""
        return len(Book.objects.raw('SELECT * FROM main_book '
                                    'INNER JOIN main_genre ON '
                                    'main_book.name_of_genre_id = main_genre.id '
                                    'WHERE main_genre.name = "science" AND '
                                    'main_book.page_count < 124'))

    def books_by_particular_author(self):  # 4
        """all book of particular author and year is 2010"""
        return Book.objects.raw('SELECT * FROM main_book '
                                'INNER JOIN main_author ON '
                                'main_book.author_id = main_author.id '
                                'WHERE main_author.name="Mele" AND '
                                'strftime("%Y", main_book.year) > "2010"')

    def en_books_where(self):  # 6
        """books where language is english,
        amount of pages more than 1 by author who elder than 34"""
        return Book.objects.raw('SELECT * FROM main_book '
                                'INNER JOIN main_author ON main_book.author_id = main_author.id'
                                'WHERE main_book.page_count > 1 AND '
                                'main_author.year_of_birth__year > 1987')

    def query_number_7(self):  # 7
        """??? all books by genres ???"""
        return 'Slava, I cannot get what you meant'

    def books_by_author_whose_name(self):  # 8
        """all book by authors whose name starts with 'm' not elder 34"""
        return Book.objects.raw('SELECT * FROM main_book '
                                'INNER JOIN main_author ON '
                                'main_book.author_id = main_author.id '
                                'WHERE main_author.name LIKE "m%" AND '
                                'main_author.year_of_birth > 1987')

    def amount_of_all_books(self):  # 9
        """amount of all books"""
        return len(Book.objects.raw('SELECT * FROM main_book'))

    def books_name_start_with(self):  # 10
        """amount of books that names start with 'p'"""
        return len(Book.objects.raw('SELECT * FROM main_book '
                                    'WHERE name LIKE "p%"'))

    def books_with_word_in_text(self):  # 13
        """amount of books that consists word 'python' in the text"""
        return len(Book.objects.raw('SELECT * FROM main_book '
                                    'WHERE text LIKE "% python %"'))

    def books_by_author_whose_genre_is(self):  # 14
        """all books of one year of author whose favorite genre is science"""
        return Book.objects.raw('SELECT * FROM main_book '
                                'LEFT JOIN main_author ON '
                                'main_book.author_id = main_author.id '
                                'WHERE main_author.favorite_genre_id IN '
                                '(SELECT id FROM main_genre WHERE main_genre.name = '
                                '"science") AND '
                                'strftime("%Y", main_book.year) = "2021"')


class RawCustomAuthorQuerySet(models.QuerySet):
    """Custom query set for author model"""

    def authors_of_particular_genre(self):  # 5
        """all authors of particular genre"""
        return Author.objects.raw('SELECT * FROM main_author '
                                  'INNER JOIN main_genre ON '
                                  'main_author.favorite_genre_id = main_genre.id '
                                  'WHERE main_genre.name="science"')

    def amount_authors_whose_names_start_with(self):  # 11
        """amount of authors whose name starts with 'p'
         and not elder than 34"""
        return len(Author.objects.raw('SELECT * FROM main_author '
                                      'WHERE strftime("%Y", DATE("now"))- '
                                      'strftime("%Y", year_of_birth) > 34 '
                                      'AND name LIKE "p%"'))

    def latest_authors(self):  # 12
        """5 latest authors"""
        return Author.objects.raw('SELECT * FROM main_author '
                                  'ORDER BY created_at DESC '
                                  'LIMIT 5')


class RawCustomGenreQuerySet(models.QuerySet):
    """Custom query set for genre model"""

    def amount_of_genres(self):  # 2
        """amount of genres"""
        return len(Genre.objects.raw('SELECT * FROM main_genre'))


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
