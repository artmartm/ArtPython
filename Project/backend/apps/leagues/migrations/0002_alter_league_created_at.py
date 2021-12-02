# Generated by Django 3.2.7 on 2021-12-01 15:20

import datetime
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leagues', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='league',
            name='created_at',
            field=models.DateField(auto_now_add=True, validators=[django.core.validators.MaxValueValidator(limit_value=datetime.date.today)]),
        ),
    ]
