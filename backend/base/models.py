from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Files(models.Model):
    sender       = models.ForeignKey(User,on_delete=models.CASCADE,related_name ='sendfiels')
    sendTime     = models.DateTimeField(auto_now_add=True)
    Files        = models.FileField(upload_to='media/')
    fileName     = models.CharField(max_length=500,blank=False)
    size         = models.IntegerField(blank = False);
    filetype     = models.CharField(blank =True,max_length=100)

    def __str__(self):
        return self.fileName


class Messages(models.Model):
    owner        = models.ForeignKey(User,on_delete=models.CASCADE,related_name="messages");
    sendTime     = models.DateTimeField(auto_now_add=True)
    body         = models.CharField(max_length=5000);
    def __str__(self):
        return f"body:{self.body}"
    
