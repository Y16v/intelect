# Generated by Django 2.2.7 on 2020-02-15 18:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20200211_1712'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userorm',
            name='phone',
            field=models.CharField(max_length=40, null=True),
        ),
    ]
