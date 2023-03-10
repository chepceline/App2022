# Generated by Django 4.1.5 on 2023-01-07 20:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0004_customuser_picture'),
    ]

    operations = [
        migrations.CreateModel(
            name='Scenario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ScenarioName', models.CharField(blank=True, max_length=100)),
                ('ModelLinks', models.CharField(blank=True, max_length=200)),
                ('LinktoDataset', models.CharField(blank=True, max_length=200)),
                ('Description', models.CharField(blank=True, max_length=200)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
