from django.db import models
from django.utils.text import slugify
from django.core.exceptions import ValidationError

# --- VALIDATOR: Enforce 1MB Limit ---
def validate_image_size(image):
    file_size = image.size
    limit_mb = 1
    if file_size > limit_mb * 1024 * 1024:
        raise ValidationError(f"Max size of file is {limit_mb} MB")

# --- MODEL: Locations ---
class Location(models.Model):
    name = models.CharField(max_length=100, unique=True, help_text="e.g. Kithyoko, Machakos")

    def __str__(self):
        return self.name

# --- MODEL: Main Property ---
class Property(models.Model):
    STATUS_CHOICES = [
        ('Available', 'Available'),
        ('Sold Out', 'Sold Out'),
        ('Coming Soon', 'Coming Soon'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, help_text="Auto-generated from title if left empty")
    location = models.ForeignKey(Location, on_delete=models.PROTECT, related_name="properties")
    size = models.CharField(max_length=50, help_text="e.g. 50x100 or 1 Acre")
    
    # UPDATED: Changed to PositiveIntegerField for numeric consistency
    price = models.PositiveIntegerField(help_text="Enter numbers only. Commas are added automatically on the site.")
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Available')
    image = models.ImageField(
        upload_to='properties/main/', 
        verbose_name="Cover Image", 
        validators=[validate_image_size],
        help_text="Max size 1MB. This will be the main display image."
    )
    description = models.TextField()
    meta_description = models.TextField(blank=True, help_text="Auto-generated from description, but you can edit it.")
    map_src = models.TextField(blank=True, help_text="Google Maps Embed Link")
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.meta_description and self.description:
            self.meta_description = self.description[:155] + "..."
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Properties"

# --- MODEL: Features ---
class PropertyFeature(models.Model):
    property = models.ForeignKey(Property, related_name='features_list', on_delete=models.CASCADE)
    name = models.CharField(max_length=100, help_text="e.g. Water on Site")

    def __str__(self):
        return self.name

# --- MODEL: Gallery Images ---
class PropertyImage(models.Model):
    property = models.ForeignKey(Property, related_name='gallery_images', on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to='properties/gallery/', 
        validators=[validate_image_size],
        help_text="Max size 1MB."
    )
    
    class Meta:
        verbose_name = "Gallery Image"
        verbose_name_plural = "More Property Images"

    def __str__(self):
        return f"Image for {self.property.title}"