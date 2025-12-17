from rest_framework import viewsets
from .models import Job
from .serializers import JobSerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.filter(is_active=True).order_by('deadline')
    serializer_class = JobSerializer