# Generated by Django 4.2.1 on 2023-09-10 08:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0009_alter_user_basic_info_cover_image_and_more'),
        ('apply_job', '0008_alter_applyforjob_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='applyforjob',
            name='userDetails',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='authentication.user_basic_info'),
        ),
    ]
