# Generated by Django 2.2.7 on 2020-04-01 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0027_auto_20200331_2059'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userorm',
            name='first_name',
            field=models.CharField(blank=True, max_length=512),
        ),
        migrations.AlterField(
            model_name='userorm',
            name='last_name',
            field=models.CharField(blank=True, max_length=512),
        ),
    ]