# Generated by Django 2.2.7 on 2020-02-27 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_auto_20200222_0532'),
    ]

    operations = [
        migrations.AddField(
            model_name='resultitemorm',
            name='modules',
            field=models.CharField(blank=True, default=None, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='resultitemorm',
            name='modules_minus',
            field=models.CharField(blank=True, default=None, max_length=255, null=True),
        ),
    ]