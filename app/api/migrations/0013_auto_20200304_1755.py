# Generated by Django 2.2.7 on 2020-03-04 17:55

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_auto_20200227_1351'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='userorm',
            options={'ordering': ('-id',)},
        ),
        migrations.AlterField(
            model_name='userorm',
            name='school',
            field=models.ForeignKey(blank=True, null=True, on_delete=None, to='api.SchoolORM'),
        ),
        migrations.AlterField(
            model_name='userorm',
            name='teacher',
            field=models.ForeignKey(blank=True, null=True, on_delete=None, to=settings.AUTH_USER_MODEL),
        ),
    ]
