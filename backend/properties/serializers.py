from rest_framework import serializers
from .models import Property, PropertyImage, PropertyFeature, Location

# --- NEW: Added Location Serializer ---
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class PropertySerializer(serializers.ModelSerializer):
    # 1. Get the list of images
    images = serializers.SerializerMethodField()
    
    # 2. Get the list of features (Extract text from the new model)
    features = serializers.SerializerMethodField()
    
    # 3. Get the Location Name (Keeps your frontend working)
    location = serializers.CharField(source='location.name', read_only=True)
    
    # OPTIONAL: Send full location details if you need the image/ID later
    # location_details = LocationSerializer(source='location', read_only=True)
    
    # Map Python names to JS names
    metaDescription = serializers.CharField(source='meta_description')
    mapSrc = serializers.CharField(source='map_src')
    img = serializers.ImageField(source='image')

    class Meta:
        model = Property
        fields = [
            'id', 'title', 'slug', 'location', 'size', 'price', 
            'status', 'img', 'images', 'description', 
            'metaDescription', 'features', 'mapSrc'
        ]

    def get_images(self, obj):
        # Start with the Main Cover Image
        image_list = []
        if obj.image:
            image_list.append(obj.image.url)
            
        # Add the "More Property Images"
        for img in obj.gallery_images.all():
            image_list.append(img.image.url)
            
        return image_list

    def get_features(self, obj):
        # Convert the Feature Objects into a simple list of strings
        # Example: returns ["Water", "Electricity", "Fenced"]
        return [f.name for f in obj.features_list.all()]