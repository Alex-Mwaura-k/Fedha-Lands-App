from django.db import models
from django.utils.text import slugify

class Job(models.Model):
    TYPE_CHOICES = [
        ('Full-Time', 'Full-Time'),
        ('Part-Time', 'Part-Time'),
        ('Contract', 'Contract'),
        ('Internship', 'Internship'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, max_length=255)
    department = models.CharField(max_length=100, help_text="e.g. Operations, Marketing")
    location = models.CharField(max_length=100, default="Ruiru, Kenya")
    job_type = models.CharField(max_length=50, choices=TYPE_CHOICES, default='Full-Time')
    
    posted_date = models.DateField(auto_now_add=True)
    deadline = models.DateField(help_text="The date applications close")
    
    description = models.TextField(help_text="Main job summary.")
    meta_description = models.TextField(blank=True, help_text="SEO description (150 chars)")

    # We use TextFields. In Admin, put each point on a NEW LINE.
    responsibilities = models.TextField(help_text="Enter each point on a new line.")
    requirements = models.TextField(help_text="Enter each point on a new line.")
    benefits = models.TextField(help_text="Enter each point on a new line.")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-posted_date']