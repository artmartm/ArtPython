new_str = [['hello', 'world'], ['such', 'well']]
# for i in new_str:
#     for j in i:
#         print(j, end='/')
#     print()

print('\n'.join('/'.join(i) for i in new_str))
