from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    subject = models.CharField(max_length=200, default="General Inquiry")
    message = models.TextField()
    date_sent = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"

class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    date_subscribed = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.email

class SiteVisit(models.Model):
    STATUS_CHOICES = [('Pending', 'Pending'), ('Visited', 'Visited'), ('Cancelled', 'Cancelled')]
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    visit_date = models.DateField()
    property_name = models.CharField(max_length=255) 
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.property_name}"

class CustomBroadcast(models.Model):
    title = models.CharField(max_length=100) 
    message = models.TextField() 
    link = models.URLField(blank=True, null=True, help_text="Optional link")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Broadcast: {self.title}"

class EmailBlast(models.Model):
    subject = models.CharField(max_length=200)
    message = models.TextField(help_text="The body of the email you want to send.")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Send Custom Email to Subscriber"
        verbose_name_plural = "Send Custom Email to Subscribers"

    def __str__(self):
        return f"Email: {self.subject}"