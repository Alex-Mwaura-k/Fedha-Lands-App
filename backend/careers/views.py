from rest_framework import viewsets
from .models import Job
from .serializers import JobSerializer

class JobViewSet(viewsets.ModelViewSet):
    # FIXED: Removed .filter(is_active=True) because 'is_active' is not in the database.
    # We fetch ALL jobs so the frontend can decide which ones are expired.
    queryset = Job.objects.all().order_by('-posted_date')
    serializer_class = JobSerializer
    lookup_field = 'slug'
    pagination_class = None