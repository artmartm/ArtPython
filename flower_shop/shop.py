from random import randint
from flower_shop.exceptions import InputDataWrongFormat, NoFlowers, NeedMoreMoney


class Flower:
    """Flower model.
    Here we can:
        -check available flowers
        -add flowers to the warehouse
        -take flowers for bouquet
        -get main information"""
    __flower_warehouse = {}
    __flower_price = {}

    def __init__(self, flower, color, amount, price):
        """Create """
        if type(flower) is str and type(color) is str:
            if type(amount) is int and type(price) is int:
                self.flower = f'{color} {flower}'
                self.amount = amount
                self.price = price
                self.__add_to_warehouse()
            else:
                raise InputDataWrongFormat('amount and price have to be int')
        else:
            raise InputDataWrongFormat('flower and color have to be str')

    def __add_to_warehouse(self):
        """Add new flowers to the warehouse"""
        if self.flower in Flower.__flower_price:
            Flower.__flower_warehouse[self.flower] += self.amount
            Flower.__flower_price[self.flower] += self.price
        else:
            Flower.__flower_warehouse[self.flower] = self.amount
            Flower.__flower_price[self.flower] = self.price

    @property
    def flowers(self):
        """Amount and type of new flowers"""
        return f'{self.amount} of {self.flower} were delivered to the warehouse'

    @flowers.setter
    def flowers(self, new_amount):
        """Can change amount of new flowers"""
        self.amount = new_amount
        self.__add_to_warehouse()

    @property
    def prices(self):
        """Price and type of new flowers"""
        return f'price of {self.flower} is {self.price} $ for each'

    @prices.setter
    def prices(self, new_price):
        """Can change the price of new flowers"""
        self.price = new_price
        self.__add_to_warehouse()

    def __add__(self, other):
        """Can increase amount of new flowers"""
        if isinstance(other, int):
            self.amount += other
            Flower.__flower_warehouse[self.flower] += other
        elif isinstance(other, Flower):
            if self.flower == other.flower:
                Flower.__flower_warehouse[self.flower] += other.amount
            else:
                Flower.__flower_warehouse[other.flower] = other.amount
        raise InputDataWrongFormat('Can not add flowers')

    @classmethod
    def take(cls, bouquet):
        """Reduces amount of available flowers according to the order"""
        for flower, amount in bouquet.items():
            cls.__flower_warehouse[flower] -= amount

    @classmethod
    def check(cls, order):
        """Check available flowers"""
        available = True
        if sum(Flower.__flower_warehouse.values()) != 0:
            for flower, amount in order.items():
                if flower in Flower.__flower_warehouse:
                    if Flower.__flower_warehouse[flower] <= amount:
                        available = 'Can not create this bouquet! Chose another one'
                        break
                else:
                    available = 'We don\'t have this type of flowers'
        else:
            available = False
        return available

    @staticmethod
    def price_list():
        """Shows prices for available flowers"""
        return Flower.__flower_price

    @staticmethod
    def flowers_list():
        """Shows available flowers"""
        return Flower.__flower_warehouse


class Bouquet:
    """Bouquet class. Here we can create bouquets"""
    __million_of_rose = {'red roses': 1000000}
    __yellow_tulips = {'yellow tulips': 21}
    __mix = {'red roses': 7, 'white roses': 7, 'yellow tulips': 1}
    __for_fun = {'red rose': 1}
    __normal = {'red roses': 3, 'yellow roses': 3, 'white roses': 3}
    __spring = {'peonies': 7}

    @classmethod
    def create_bouquet(cls, order):
        """Make a bouquet when an order"""
        Flower.take(order)
        price = Shop.price(order)
        return f'You\'ve paid {price}$! Thank you for order!'

    @classmethod
    def for_sale(cls):
        """Available bouquets for sale"""
        out_bouquets = []
        for bouquet in Bouquet.__our_bouquets():
            if Flower.check(bouquet) is True:
                out_bouquets.append(bouquet)
        return out_bouquets

    @staticmethod
    def __our_bouquets():
        """Static method with possible shops bouquets"""
        return [Bouquet.__million_of_rose,
                Bouquet.__yellow_tulips,
                Bouquet.__mix,
                Bouquet.__for_fun,
                Bouquet.__normal,
                Bouquet.__spring]


class Shop:
    """Shop class where we can get the price and make an order"""

    def __init__(self):
        if Flower.check(order={}):
            'Welcome to our shop! Make an order'  # I want to show this message. What need I do?
        else:
            raise NoFlowers

    def your_taste(self):
        """If client doesn't know what to buy"""
        bouquets = Bouquet.for_sale()
        if len(bouquets) != 0:
            bouquet = bouquets[randint(0, len(bouquets)) - 1]
            return f'I think "{bouquet}" is a good choice'
        return f'There is no available bouquets select from {self.look_around()}'

    @classmethod
    def get_price(cls, order):
        """Shows price of an order"""
        return f'Your order will cost you {Shop.price(order)}$'

    @staticmethod
    def price(order):
        """Returns price which we can use in different classes"""
        price = 0
        for flower, amount in order.items():
            price += Flower.price_list()[flower] * amount
        return price

    @staticmethod
    def look_around():
        """Shows available flowers by using method from class Flower"""
        return Flower.flowers_list()

    @staticmethod
    def show_prices():
        """Shows prices of flowers by using method from class Flower"""
        return Flower.price_list()

    @staticmethod
    def make_order(order, money):
        """Checks if an orders is available and compare
        available money and order price"""
        if Flower.check(order) is True:
            if Shop.price(order) <= money:
                return Bouquet.create_bouquet(order)
            raise NeedMoreMoney
        return Flower.check(order)
