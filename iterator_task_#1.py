# first way
class Counter:

    def __init__(self, start, stop):
        if isinstance(start and stop, int):
            self.start = start - 1
            self.stop = stop - 1
        else:
            raise ValueError('start and stop have to be integers!')

    def __iter__(self):
        return self

    def __next__(self):
        if self.start < self.stop:
            self.start += 1
            return self.start
        raise StopIteration


# second way
def my_counter(start, stop):
    if isinstance(start and stop, int):

        start -= 1
        while stop - 1 > start:
            start += 1
            yield start
    else:
        raise ValueError('start and stop have to be integers!')
