# Generated by Django 2.2.7 on 2020-02-10 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_resultitemorm_resultorm'),
    ]

    operations = [
        migrations.AddField(
            model_name='userorm',
            name='student_password',
            field=models.CharField(default=None, max_length=255, null=True),
        ),
    ]
