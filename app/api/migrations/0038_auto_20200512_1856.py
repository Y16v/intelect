# Generated by Django 2.2.7 on 2020-05-12 18:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0037_resultarchiveorm'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resultarchiveorm',
            name='total_points',
            field=models.FloatField(),
        ),
    ]
