# Generated by Django 4.2.1 on 2023-09-05 05:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('add_job', '0008_addjob_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='addjob',
            name='offered_salary',
            field=models.CharField(max_length=70000),
        ),
    ]
