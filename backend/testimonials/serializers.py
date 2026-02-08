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
        text_fields = ['name', 'location', 'text', 'role']
        for field in text_fields:
            if field in data:
                data[field] = bleach.clean(data[field], tags=[], strip=True)
        return data