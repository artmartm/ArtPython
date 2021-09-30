from icecream import ic


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

    # def __getitem__(self, item):


for i in Counter(3, 10):
    ic(i)


# another way
def my_counter(start, stop):
    start -= 1
    while stop - 1 > start:
        start += 1
        yield start


for i in my_counter(1, 5):
    ic(i)
# WHILE task ????
lst = [1, 2, 3, 4, 5, 6, 7]
for i in range(len(lst)):
    ic(lst[i])

i = 0
while i < len(lst):
    ic(lst[i])
    i += 1
