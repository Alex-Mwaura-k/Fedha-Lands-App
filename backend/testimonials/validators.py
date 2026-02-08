import os
from django.core.exceptions import ValidationError
from django.core.files.images import get_image_dimensions

def validate_file_size(value):
    limit_mb = 2
    if value.size > limit_mb * 1024 * 1024:
        raise ValidationError(f"File size cannot exceed {limit_mb} MB.")

def validate_image_extension(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = ['.jpg', '.jpeg', '.png', '.webp']
    if not ext.lower() in valid_extensions:
        raise ValidationError("Unsupported file extension. Allowed: jpg, jpeg, png, webp")

def validate_real_image(value):
    """
    Reads the file header (magic numbers) to ensure it's a valid image, 
    preventing malicious scripts renamed as .jpg from being uploaded.
    """
    try:
        w, h = get_image_dimensions(value)
        if not w or not h:
            raise ValidationError("The file is not a valid image.")
    except Exception:
        raise ValidationError("The file content is invalid or corrupted.")