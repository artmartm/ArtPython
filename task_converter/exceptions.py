class FileHasWrongFormat(Exception):
    """A custom exception in case csv file has wrong format"""

    def __init__(self, file, message):
        self.file = file
        self.message = message
        super().__init__(message)

    def __str__(self):
        return '%s %s' % (self.file, self.message)


class WrongFilePath(Exception):
    """A custom exception in case input file has wrong path"""

    def __init__(self, path):
        self.path = path

    def __str__(self):
        return f'make sure {self.path} exists'
