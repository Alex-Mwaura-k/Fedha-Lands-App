from django.db import models
from django.core.exceptions import ValidationError

# --- VALIDATOR: Enforce 1MB Limit ---
def validate_image_size(image):
    file_size = image.size
    limit_mb = 1
    if file_size > limit_mb * 1024 * 1024:
        raise ValidationError(f"Max size of file is {limit_mb} MB")

class GalleryItem(models.Model):
    TYPE_CHOICES = [
        ('team', 'Team'),
        ('poster', 'Events/Poster'),
        ('property', 'Property (Manual)'),
    ]

    title = models.CharField(
        max_length=50, 
        help_text="e.g. 'John Kamau' or 'Free Site Visits' (Max 50 chars)"
    )
    
    item_type = models.CharField(
        max_length=20, 
        choices=TYPE_CHOICES, 
        default='team',
        verbose_name="Category"
    )
    
    image = models.ImageField(
        upload_to='gallery/', 
        validators=[validate_image_size],
        help_text="Upload an image (Max Size: 1MB)"
    )
    
    description = models.CharField(
        max_length=100, 
        verbose_name="Short Description",
        help_text="e.g. 'Senior Sales Manager guiding a client.' (Max 100 chars)"
    )
    
    alt_text = models.CharField(
        max_length=255, 
        blank=True,
        verbose_name="SEO Alt Text",
        help_text="Auto-generated from Title if left empty. Describes image for Google."
    )
    
    created_at = models.DateTimeField(auto_now_add=True)

    # --- AUTO-GENERATE ALT TEXT ---
    def save(self, *args, **kwargs):
        if not self.alt_text:
            # If title is "John Kamau", alt becomes "John Kamau - Fedha Land Ventures Gallery"
            self.alt_text = f"{self.title} - Fedha Land Ventures Gallery"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Gallery Item"