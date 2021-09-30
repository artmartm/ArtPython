from icecream import ic


# first task
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


# second task
def my_counter(start, stop):
    start -= 1
    while stop - 1 > start:
        start += 1
        yield start


if __name__ == "__main__":
    ic('first')
    for element in Counter(1, 5):
        ic(element)
    ic('second')
    for element in my_counter(1, 5):
        ic(element)

