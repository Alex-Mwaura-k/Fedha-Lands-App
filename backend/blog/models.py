from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    thumbnail = models.ImageField(upload_to='blog_thumbnails/')
    content = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title