from rest_framework import viewsets
from .models import GalleryImage
from .serializers import GallerySerializer

class GalleryViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all().order_by('-uploaded_at')
    serializer_class = GallerySerializer