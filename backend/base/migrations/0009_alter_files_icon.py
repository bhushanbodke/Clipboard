# Generated by Django 4.0.3 on 2022-12-18 05:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_alter_files_icon'),
    ]

    operations = [
        migrations.AlterField(
            model_name='files',
            name='icon',
            field=models.ImageField(blank=True, upload_to='icons/'),
        ),
    ]
