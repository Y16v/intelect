# Generated by Django 2.2.7 on 2020-03-13 19:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_auto_20200312_1636'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resultitemorm',
            name='answer',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='resultitemorm',
            name='exact',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]