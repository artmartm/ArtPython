from django.db import models
from .models import Book, Genre, Author


class RCustomBookQuerySet(models.QuerySet):
    """Custom query set for book model"""

    def amount_of_book_by_author(self, author):  # 1
        """amount of books which were written by particular author"""
        return len(Book.objects.raw(f'''SELECT * FROM main_book 
                                    INNER JOIN main_author ON 
                                    main_book.author_id = main_author.id  
                                    WHERE main_author.name = "{author}"'''))

    def amount_of_en_books(self, language, amount_of_pages, genre):  # 3
        """amount of books which were written in certain language,
         where pages are less than a certain amount in particular genre"""
        return len(Book.objects.raw(f'''SELECT * FROM main_book 
                                    INNER JOIN main_genre ON 
                                    main_book.genre_id = main_genre.id 
                                    WHERE main_genre.name = "{genre}" AND 
                                    main_book.page_count < {amount_of_pages} 
                                    AND main_book.prime_language = "{language}"'''))

    def books_by_particular_author(self, author, year):  # 4
        """amount of books which were written in certain language
         and after a certain ages"""
        return Book.objects.raw(f'''SELECT * FROM main_book 
                                INNER JOIN main_author ON 
                                main_book.author_id = main_author.id 
                                WHERE main_author.name="{author}" AND 
                                strftime("%Y", main_book.year) > "{year}"''')

    def en_books_where(self, language, pages, ages):  # 6 !!! T
        """books which were written in a certain language, where
        amount of pages more than particular number and
        author is elder than a certain ages"""
        return Book.objects.raw(f'''SELECT * FROM main_book 
                                INNER JOIN main_author ON main_book.author_id = main_author.id 
                                WHERE main_book.page_count > {pages} AND 
                                main_book.prime_language = "{language}" AND 
                                strftime("%Y", DATE("now"))- 
                                strftime("%Y", year_of_birth) <= "{ages}"''')

    def query_number_7(self):  # 7
        """??? all books by genres ???"""
        return 'Slava, I cannot get what you meant'

    def books_by_author_whose_name(self, first_letter, ages):  # 8
        """all book by authors whose name starts with particular letter
         and not elder than particular ages"""
        return Book.objects.raw(f'''SELECT * FROM main_book 
                                INNER JOIN main_author ON 
                                main_book.author_id = main_author.id 
                                WHERE main_author.name LIKE "{first_letter}%" 
                                AND strftime("%Y", DATE("now"))-
                                strftime("%Y", year_of_birth) < "{ages}"''')

    def amount_of_all_books(self):  # 9
        """amount of all books"""
        return len(Book.objects.raw('SELECT * FROM main_book'))

    def books_name_start_with(self, first_letter):  # 10
        """amount of books that names start with particular letter"""
        return len(Book.objects.raw(f'''SELECT * FROM main_book 
                                    WHERE name LIKE "{first_letter}%"'''))

    def books_with_word_in_text(self, word):  # 13
        """all books that consists particular word in the text"""
        return len(Book.objects.raw(f'''SELECT * FROM main_book 
                                    WHERE text LIKE "% {word} %"'''))

    def books_by_author_whose_genre_is(self, year, genre):  # 14
        """all books of one year of author who has particular genre"""
        return Book.objects.raw(f'''SELECT * FROM main_book 
                                LEFT JOIN main_author ON 
                                main_book.author_id = main_author.id 
                                WHERE main_author.genre_id IN 
                                (SELECT id FROM main_genre WHERE main_genre.name = 
                                "{genre}") AND 
                                strftime("%Y", main_book.year) = "{year}"''')


class RCustomAuthorQuerySet(models.QuerySet):
    """Custom query set for author model"""

    def authors_of_particular_genre(self, genre):  # 5
        """all authors of particular genre"""

        return Author.objects.raw(f'''SELECT * FROM main_author 
                                  INNER JOIN main_genre ON 
                                  main_author.genre_id = main_genre.id 
                                  WHERE main_genre.name="{genre}"''')

    def amount_authors_whose_names_start_with(self, first_letter, ages):  # 11
        """amount of authors whose name starts with particular letter
         and not elder than particular ages"""
        return len(Author.objects.raw(f'''SELECT * FROM main_author 
                                      WHERE strftime("%Y", DATE("now"))- 
                                      strftime("%Y", year_of_birth) < "{ages}"
                                      AND name LIKE "{first_letter}%"'''))

    def latest_authors(self):  # 12
        """5 latest authors"""
        return Author.objects.raw('SELECT * FROM main_author '
                                  'ORDER BY created_at DESC '
                                  'LIMIT 5')


class RCustomGenreQuerySet(models.QuerySet):
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
