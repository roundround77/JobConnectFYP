# Generated by Django 4.2.4 on 2023-08-18 10:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('add_job', '0004_alter_addjob_video'),
    ]

    operations = [
        migrations.AddField(
            model_name='addjob',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('approved', 'Approved'), ('completed', 'Completed')], default='pending', max_length=10),
        ),
    ]
