from django.db import models

class ValidSerial(models.Model):
    serial_number = models.CharField(max_length=100, unique=True)
    owner_name = models.CharField(max_length=200)

    def __str__(self):
        return self.serial_number

class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    content = models.TextField()
    is_approved = models.BooleanField(default=False) # Approved by Admin only
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.name}"