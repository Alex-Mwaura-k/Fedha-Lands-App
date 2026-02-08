import bleach
from django.db import models
from django.utils.text import slugify
from django.core.exceptions import ValidationError
from django_ckeditor_5.fields import CKEditor5Field
from cloudinary.models import CloudinaryField

# --- VALIDATOR: Enforce 1MB Limit ---
def validate_image_size(image):
    try:
        file_size = image.size
        limit_mb = 1
        if file_size > limit_mb * 1024 * 1024:
            raise ValidationError(f"Max size of file is {limit_mb} MB")
    except (AttributeError, ValueError):
        pass

# --- MODEL: Category ---
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"

# --- MODEL: Blog Posts ---
class BlogPost(models.Model):
    TYPE_CHOICES = [
        ('article', 'Article'),
        ('video', 'Video'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, help_text="Auto-generated from title if left empty")
    
    post_type = models.CharField(
        max_length=10, 
        choices=TYPE_CHOICES, 
        default='article',
        verbose_name="Type"
    )
    
    category = models.ForeignKey(
        Category, 
        on_delete=models.PROTECT, 
        related_name='posts',
        help_text="Select a category from the list."
    )

    # FIXED: Removed 'verbose_name' keyword to prevent multiple values error
    image = CloudinaryField(
        'Cover Image', # This string now serves as the verbose_name
        folder='fedha/blog/covers/', 
        validators=[validate_image_size],
        blank=True, 
        null=True,
        help_text="Max size 1MB. Required for Articles."
    )

    description = models.TextField(verbose_name="Short Description", help_text="Used for the card summary.")
    meta_description = models.TextField(blank=True, help_text="Auto-generated from description if empty.")

    video_url = models.URLField(
        blank=True, 
        null=True, 
        verbose_name="Video Embed URL",
        help_text="e.g. https://www.youtube.com/embed/..."
    )

    content = CKEditor5Field('Article Content', config_name='default', blank=True, null=True)

    date_published = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.content:
            allowed_tags = [
                'p', 'b', 'i', 'u', 'em', 'strong', 'a', 
                'ul', 'ol', 'li', 'br', 'h1', 'h2', 'h3', 
                'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td'
            ]
            allowed_attrs = {
                'a': ['href', 'title', 'target'],
                '*': ['class']
            }
            self.content = bleach.clean(self.content, tags=allowed_tags, attributes=allowed_attrs)

        if not self.slug:
            self.slug = slugify(self.title)
        
        if not self.meta_description and self.description:
            self.meta_description = self.description[:155].strip() + "..."
            
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-date_published']
        verbose_name = "Blog Post"
        verbose_name_plural = "Blog Posts"