from rest_framework import viewsets
from rest_framework.response import Response
from .models import GalleryItem
from properties.models import Property
from .serializers import GalleryItemSerializer, PropertyGallerySerializer

class GalleryViewSet(viewsets.ViewSet):
    """
    A custom ViewSet that lists both GalleryItems and Property Cover Images.
    """
    def list(self, request):
        # 1. Fetch Manual Gallery Items
        gallery_items = GalleryItem.objects.all().order_by('-created_at')
        gallery_data = GalleryItemSerializer(gallery_items, many=True, context={'request': request}).data

        # 2. Fetch Property Cover Images
        properties = Property.objects.all().order_by('-created_at')
        property_data = PropertyGallerySerializer(properties, many=True, context={'request': request}).data

        # 3. Combine them (Properties first, or mixed based on date if you prefer)
        # Here we put properties first, then manual uploads
        combined_data = property_data + gallery_data
        
        return Response(combined_data)