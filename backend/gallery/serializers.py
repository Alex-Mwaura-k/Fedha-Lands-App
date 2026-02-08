from rest_framework import serializers
from .models import GalleryItem
from properties.models import Property

class GalleryItemSerializer(serializers.ModelSerializer):
    # This creates a unique ID for React keys (e.g., "gal_1")
    unique_id = serializers.SerializerMethodField()
    type = serializers.CharField(source='item_type') # Rename for frontend consistency
    img = serializers.ImageField(source='image')     # Rename for frontend consistency
    desc = serializers.CharField(source='description') # Rename for frontend consistency
    alt = serializers.CharField(source='alt_text')   # Rename for frontend consistency

    class Meta:
        model = GalleryItem
        fields = ['unique_id', 'title', 'type', 'img', 'desc', 'alt']

    def get_unique_id(self, obj):
        return f"gal_{obj.id}"

# Serializer to convert Property model into Gallery format
class PropertyGallerySerializer(serializers.ModelSerializer):
    unique_id = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()
    img = serializers.ImageField(source='image')     # Use the cover image
    desc = serializers.SerializerMethodField()
    alt = serializers.CharField(source='title')      # Use title as alt text

    class Meta:
        model = Property
        fields = ['unique_id', 'title', 'type', 'img', 'desc', 'alt']

    def get_unique_id(self, obj):
        return f"prop_{obj.id}"

    def get_type(self, obj):
        return "property"

    def get_desc(self, obj):
        return f"{obj.location.name} - {obj.size}"