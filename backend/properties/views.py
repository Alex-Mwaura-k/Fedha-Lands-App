from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Property, Location
from .serializers import PropertySerializer, LocationSerializer

# --- NEW: Added Location ViewSet ---
class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all().order_by('-created_at')
    serializer_class = PropertySerializer
    
    # Added search capabilities (Optional but recommended)
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'location__name', 'description']
    filterset_fields = ['status', 'price']