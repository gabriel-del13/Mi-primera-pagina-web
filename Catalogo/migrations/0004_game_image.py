# Generated by Django 5.0.7 on 2024-08-18 01:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Catalogo', '0003_rename_orderitem_stock_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='game_images/'),
        ),
    ]
