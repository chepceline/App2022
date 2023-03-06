# Generated by Django 4.1.5 on 2023-01-17 11:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0011_remove_scenariosolution_trainingdata_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='scenariouser',
            name='user_id',
        ),
        migrations.AddField(
            model_name='scenariouser',
            name='email',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name='scenariouser',
            name='fullname',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name='scenariouser',
            name='password',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]