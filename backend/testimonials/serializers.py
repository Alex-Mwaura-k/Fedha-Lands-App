from rest_framework import serializers
from .models import Testimonial
import bleach

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            'id', 'name', 'role', 'location', 'text', 'rating', 'image', 
            'date_submitted', 'title_number_used' 
        ]
        # Keep this! It prevents users from fake-posting a number, 
        # while our View logic above forces the real one in.
        read_only_fields = ['title_number_used']

    def validate(self, data):
        """
        Sanitize all user-input text fields. 
        Since testimonials are public-facing, we strip ALL HTML tags 
        to prevent XSS and keep the layout consistent.
        """
        text_fields = ['name', 'location', 'text', 'role']
        
        for field in text_fields:
            if field in data and data[field]:
                # tags=[] and strip=True ensures any HTML like <script> is completely removed,
                # not just escaped.
                data[field] = bleach.clean(data[field], tags=[], strip=True).strip()
                
        return data