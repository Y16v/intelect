# Generated by Django 2.2.7 on 2020-05-06 17:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0034_auto_20200506_1734'),
    ]

    operations = [
        migrations.AlterField(
            model_name='packageproposalorm',
            name='status',
            field=models.IntegerField(choices=[(1, 'Pending'), (2, 'Canceled'), (3, 'Rejected'), (4, 'Confirmed')], default=1),
        ),
    ]
