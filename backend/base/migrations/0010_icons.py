# Generated by Django 4.0.3 on 2022-12-18 05:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_alter_files_icon'),
    ]

    operations = [
        migrations.CreateModel(
            name='Icons',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.ImageField(blank=True, default='icons/image.png', upload_to='')),
                ('doc', models.ImageField(blank=True, default='icons/doc.png', upload_to='')),
                ('exe', models.ImageField(blank=True, default='icons/exe.png', upload_to='')),
                ('zip', models.ImageField(blank=True, default='icons/zip.png', upload_to='')),
                ('vid', models.ImageField(blank=True, default='icons/video.png', upload_to='')),
            ],
        ),
    ]
