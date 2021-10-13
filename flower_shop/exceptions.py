class InputDataFormatError(Exception):
    """A custom exception in case input data are wrong"""


class FlowersSoldOutError(Exception):
    """A custom exception in case all flowers were sold"""

    def __str__(self):
        return 'All flowers were sold. Come back tomorrow!'


class NotEnoughMoneyError(Exception):
    """A custom exception in case client doesn't have enough money"""

    def __str__(self):
        return 'Not enough money to buy this bouquet'

