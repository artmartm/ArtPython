# Generated by Django 3.2.8 on 2021-12-24 07:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('players', '0011_player_second_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='player',
            name='city',
        ),
    ]
