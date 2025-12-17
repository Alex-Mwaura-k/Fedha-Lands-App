from rest_framework import viewsets
from .models import Testimonial
from .serializers import TestimonialSerializer

class TestimonialViewSet(viewsets.ModelViewSet):
    # Only show reviews that the Admin has approved
    queryset = Testimonial.objects.filter(is_approved=True).order_by('-created_at')
    serializer_class = TestimonialSerializer