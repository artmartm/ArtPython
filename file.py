with open('git_commands.txt','a') as file:
    a=input('yes/no: ')
    while a:
        file.write(input()+'\n')
        a = input('yes/no: ')
