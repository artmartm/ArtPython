# Generated by Django 3.2.8 on 2021-12-24 18:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('players', '0012_remove_player_city'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='player',
            options={'verbose_name': 'Player', 'verbose_name_plural': 'Players'},
        ),
        migrations.AlterModelOptions(
            name='playermaininfo',
            options={'verbose_name': 'Player-Main-Info', 'verbose_name_plural': 'Player-Main-Info'},
        ),
        migrations.AlterModelOptions(
            name='playerpersonalinfo',
            options={'verbose_name': 'Player-Personal-Info', 'verbose_name_plural': 'Player-Personal-Info'},
        ),
        migrations.DeleteModel(
            name='HeadToHead',
        ),
    ]
