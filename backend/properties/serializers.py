from rest_framework import serializers
from .models import Property, PropertyImage, PropertyFeature, Location

# --- Location Serializer ---
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class PropertySerializer(serializers.ModelSerializer):
    # 1. Get the list of images (Fixed for absolute URLs)
    images = serializers.SerializerMethodField()
    
    # 2. Get the list of features
    features = serializers.SerializerMethodField()
    
    # 3. Get the Location Name
    location = serializers.CharField(source='location.name', read_only=True)
    
    # Map Python names to JS names for Frontend consistency
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
        """
        Combines the main cover image and gallery images into a single list
        of absolute URLs so they load correctly on the React frontend.
        """
        request = self.context.get('request')
        image_list = []
        
        # Add the Main Cover Image
        if obj.image:
            full_url = obj.image.url
            if request is not None:
                full_url = request.build_absolute_uri(full_url)
            image_list.append(full_url)
            
        # Add the "More Property Images" from the Gallery
        for img_obj in obj.gallery_images.all():
            if img_obj.image:
                full_url = img_obj.image.url
                if request is not None:
                    full_url = request.build_absolute_uri(full_url)
                image_list.append(full_url)
            
        return image_list

    def get_features(self, obj):
        """
        Converts Feature objects into a simple list of strings for the UI.
        """
        return [f.name for f in obj.features_list.all()]