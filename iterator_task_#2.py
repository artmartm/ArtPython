from icecream import ic


def while_as_for(lst):
    try:
        iter_for_books = iter(lst)

        while True:
            try:
                book = next(iter_for_books)
            except StopIteration:
                break
    except TypeError:
        raise TypeError('object has to be iterable!')


if __name__ == "__main__":
    books = ['Atlas Shrugged', 'Tango with django ', 'Python crash course']

    while_as_for(books)
