from django.db import models

# Create your models here.
class Project(models.Model):
    name=models.CharField(max_length=100)
    startdate=models.DateTimeField()
    enddate=models.DateTimeField()
    comments=models.CharField(max_length=100)
    created=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    


class YourModel(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )

    name = models.CharField(max_length=100)
    description = models.TextField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)

    def __str__(self):
        return self.name
