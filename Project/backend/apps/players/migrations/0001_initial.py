# Generated by Django 3.2.9 on 2021-11-27 15:00

import datetime
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('teams', '0001_initial'),
        ('general', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateField(validators=[django.core.validators.MaxValueValidator(limit_value=datetime.date.today)])),
                ('still_active', models.BooleanField(default=True)),
                ('name', models.CharField(max_length=50)),
                ('image', models.ImageField(blank=True, null=True, upload_to='')),
                ('score', models.PositiveIntegerField()),
                ('shoots', models.CharField(choices=[('L', 'Left'), ('R', 'Right')], default='L', max_length=7)),
                ('position', models.CharField(choices=[('GK', 'Goalkeeper'), ('D', 'Defender'), ('F', 'Forward')], default='F', max_length=7)),
                ('free_agent', models.BooleanField(default=False)),
                ('playing_for_national_team', models.BooleanField(default=True)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='general.city')),
                ('country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='general.country')),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='teams.team')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='PlayerPersonalInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('favorite_color', models.CharField(max_length=30)),
                ('favorite_music', models.CharField(max_length=30)),
                ('favorite_movie', models.CharField(max_length=30)),
                ('family', models.CharField(max_length=30)),
                ('education', models.CharField(max_length=50)),
                ('favorite_game', models.CharField(max_length=30)),
                ('favorite_car', models.CharField(max_length=30)),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='players.player')),
            ],
        ),
        migrations.CreateModel(
            name='PlayerMainInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('legionary', models.BooleanField(default=False)),
                ('height', models.PositiveIntegerField()),
                ('weight', models.PositiveIntegerField()),
                ('captain', models.BooleanField(default=False)),
                ('salary_per_year', models.PositiveIntegerField()),
                ('sport_brand', models.CharField(choices=[('CCM', 'CCM'), ('Under Armour', 'Under Armour'), ('Adidas', 'Adidas'), ('Reebok', 'Reebok'), ('New Balance', 'New Balance'), ('Bauer', 'Bauer'), ('Easton', 'Easton')], max_length=15)),
                ('contract_till', models.DateField()),
                ('academy', models.CharField(max_length=50)),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='players.player')),
            ],
        ),
    ]
