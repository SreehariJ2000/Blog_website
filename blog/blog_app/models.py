from django.db import models
from django.contrib.auth.models import AbstractUser



class Customuser(AbstractUser):
    email=models.EmailField(unique=True)
    USERNAME_FIELD="email"
    REQUIRED_FIELDS=["username"]


class ProjectManager(models.Model):
    name=models.CharField(max_length=100)


# Create your models here.
class Project(models.Model):
    name=models.CharField(max_length=100)
    projectmanager=models.ForeignKey(ProjectManager,on_delete=models.CASCADE,blank=True,null=True)
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



class Image(models.Model):
    image = models.ImageField(upload_to='images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.image.name