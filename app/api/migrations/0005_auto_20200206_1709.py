# Generated by Django 2.2.7 on 2020-02-06 17:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20200206_1547'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userorm',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
    ]
