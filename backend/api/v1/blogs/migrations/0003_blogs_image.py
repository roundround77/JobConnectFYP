# Generated by Django 4.2.1 on 2023-09-08 07:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0002_rename_category_blogs_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogs',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='user_image'),
        ),
    ]
