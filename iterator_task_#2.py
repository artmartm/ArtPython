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
