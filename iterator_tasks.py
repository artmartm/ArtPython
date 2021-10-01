from icecream import ic


# FIRST TASK
# first way
class Counter:

    def __init__(self, start, stop):
        self.start = start - 1
        self.stop = stop - 1

    def __iter__(self):
        return self

    def __next__(self):
        if isinstance(self.start, int) and isinstance(self.stop, int):
            if self.start < self.stop:
                self.start += 1
                return self.start
            raise StopIteration
        return 'stop and start have to be numbers'


# second way
def my_counter(start, stop):
    start -= 1
    while stop - 1 > start:
        start += 1
        yield start


# SECOND TASK

books = ['Atlas Shrugged', 'Tango with django ', 'Python crash course']

iter_for_books = iter(books)

while True:
    try:
        book = next(iter_for_books)
        ic(book)
    except StopIteration:
        break

if __name__ == "__main__":
    ic('first way')
    for element in Counter(1, 5):
        ic(element)
    ic('second way')
    for element in my_counter(1, 5):
        ic(element)
