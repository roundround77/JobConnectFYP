# Generated by Django 4.2.4 on 2023-08-18 06:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('add_job', '0002_alter_addjob_carrer_level_alter_addjob_experience_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='addjob',
            name='video',
            field=models.FileField(blank=True, null=True, upload_to='user_image'),
        ),
    ]
