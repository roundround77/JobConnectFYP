# Generated by Django 4.2.4 on 2023-08-18 09:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('add_job', '0003_addjob_video'),
    ]

    operations = [
        migrations.AlterField(
            model_name='addjob',
            name='video',
            field=models.FileField(blank=True, null=True, upload_to='job_video'),
        ),
    ]
