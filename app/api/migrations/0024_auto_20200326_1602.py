# Generated by Django 2.2.7 on 2020-03-26 16:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_packagetypeorm'),
    ]

    operations = [
        migrations.RenameField(
            model_name='packagetypeorm',
            old_name='count',
            new_name='accounts_quantity',
        ),
        migrations.AddField(
            model_name='schoolorm',
            name='is_for_individual_students',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='schoolorm',
            name='package_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.PackageTypeORM'),
        ),
    ]
