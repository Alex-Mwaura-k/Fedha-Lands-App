from django.db import models

class Job(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    deadline = models.DateField()

    def __str__(self):
        return self.title