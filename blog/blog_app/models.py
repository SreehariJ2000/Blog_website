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