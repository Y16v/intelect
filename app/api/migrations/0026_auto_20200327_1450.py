# Generated by Django 2.2.7 on 2020-03-27 14:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0025_individualstudentproposalorm_schoolproposalorm'),
    ]

    operations = [
        migrations.RenameField(
            model_name='packagetypeorm',
            old_name='is_individual',
            new_name='is_for_individual_students',
        ),
    ]
