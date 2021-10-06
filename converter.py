class CsvToJsonConverter:

    def __init__(self, csv_path, json_path):
        try:
            if csv_path[-4::] == '.csv' and json_path[-5::] == '.json':
                self.csv_path = csv_path
                self.json_path = json_path
            else:
                raise TypeError('wrong file format!')
        except FileNotFoundError:
            raise FileNotFoundError('wrong file path!')

    def get_csv_data(self):
        data = {}
        with open(self.csv_path, "r", encoding='utf-8') as csv_file:
            counter = 0
            header = None
            for line in csv_file:
                line = line.rstrip().split(',')
                if counter == 0:
                    header = line
                else:
                    nested_counter = 0
                    for nested_line in line:
                        if nested_counter == 0:
                            nested_data = {}
                            data[nested_line] = nested_data
                        else:
                            nested_data[header[nested_counter]] = nested_line
                        nested_counter += 1
                counter += 1
        return data

    def convert_data_to_json(self):
        with open(self.json_path, 'w', encoding='utf-8') as json_file:
            json_file.writelines(str(self.get_csv_data()).replace("'", '"'))
