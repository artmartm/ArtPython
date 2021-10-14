class InputDataFormatError(Exception):
    """A custom exception in case input data are wrong"""


class FlowersSoldOutError(Exception):
    """A custom exception in case all flowers were sold"""

    def __str__(self):
        return 'All flowers were sold. Come back tomorrow!'


class NotExistFlowerError(Exception):
    """A custom exception in case a flower doesn't exist"""

    def __str__(self):
        return "This flower doesn't exist in real world!"


class NotEnoughMoneyError(Exception):
    """A custom exception in case client doesn't have enough money"""

    def __str__(self):
        return 'Not enough money to buy this bouquet'
