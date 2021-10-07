import os

from abc import ABC, abstractmethod
from task_2.exceptions import CsvWrongFormat, WrongFilePath, JsonWrongFormat


class Converter(ABC):

    def __init__(self, input_path, output_path):
        if os.path.exists(input_path):
            self.input_path = input_path
            self.output_path = output_path
        else:
            raise WrongFilePath(input_path)

    @abstractmethod
    def get_data(self):
        data = list()
        with open(self.input_path, "r", encoding='utf-8') as input_file:
            counter = 0
            header = None
            for line in input_file:
                line = line.rstrip()
                if line[0] == '"':
                    line = line[1:-1].rstrip().split('","')
                else:
                    line = line.rstrip().split(',')
                if counter == 0:
                    header = line
                else:
                    data.append(dict(zip(header, line)))
                counter += 1
        return data

    @abstractmethod
    def convert_data(self):
        pass


class ConverterCsvToJson(Converter):
    """Converts data from .csv format to .json format"""

    def __init__(self, csv_path, json_path):

        if os.path.splitext(csv_path)[1] == '.csv':
            if os.path.splitext(json_path)[1] == '.json':
                self.csv_path = csv_path
                self.json_path = json_path
            else:
                raise JsonWrongFormat(json_path)
        else:
            raise CsvWrongFormat(json_path)
        super().__init__(csv_path, json_path)

    def get_data(self):
        """Get the data from .csv format"""
        return super().get_data()

    def convert_data(self):
        """Converts the data from .csv format to .json format"""
        with open(self.json_path, 'w', encoding='utf-8') as json_file:
            json_file.writelines(str(self.get_data()).replace("'", '"'))
