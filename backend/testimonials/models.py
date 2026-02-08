from django.db import models
from .validators import validate_file_size, validate_image_extension, validate_real_image

class ValidSerial(models.Model):
    serial_number = models.CharField(
        max_length=50, 
        unique=True, 
        help_text="Enter the Title Deed/Plot Number (e.g. FEDHA-001)"
    )
    # REMOVED: client_name field
    
    # This is handled by the system now
    is_used = models.BooleanField(default=False, help_text="System checks this automatically when a review is submitted.")

    def __str__(self):
        return self.serial_number

    class Meta:
        verbose_name = "Valid Title Number"

class Testimonial(models.Model):
    ROLE_CHOICES = [
        ('Investor', 'Investor'),
        ('Home Owner', 'Home Owner'),
        ('Diaspora Client', 'Diaspora Client'),
        ('Business Owner', 'Business Owner'),
        ('Partner', 'Partner'),
    ]

    # --- APPROVAL AT THE TOP ---
    is_approved = models.BooleanField(
        default=False, 
        help_text="Check this box and hit save to make the review visible on the website."
    )

    # Content
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='Investor')
    location = models.CharField(max_length=100)
    text = models.TextField(max_length=300)
    rating = models.IntegerField(default=5, choices=[(i, i) for i in range(1, 6)])
    
    # Verification Data
    title_number_used = models.CharField(
        max_length=50, 
        help_text="The serial number provided by the client."
    )
    
    image = models.ImageField(
        upload_to='testimonials/', 
        validators=[validate_file_size, validate_image_extension, validate_real_image], 
        blank=True, 
        null=True
    )
    
    date_submitted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        status = "✅ LIVE" if self.is_approved else "⏳ PENDING"
        return f"[{status}] {self.name}"

    class Meta:
        ordering = ['-date_submitted']