# Generated by Django 3.2.8 on 2022-08-09 12:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_flightapi'),
    ]

    operations = [
        migrations.AddField(
            model_name='flight',
            name='price',
            field=models.IntegerField(default=3730),
        ),
    ]