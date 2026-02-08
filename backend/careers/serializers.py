from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    # Rename fields to match your React code exactly
    type = serializers.CharField(source='job_type')
    postedDate = serializers.DateField(source='posted_date')
    metaDescription = serializers.CharField(source='meta_description')
    
    # Custom fields to convert text blocks into lists
    responsibilities = serializers.SerializerMethodField()
    requirements = serializers.SerializerMethodField()
    benefits = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = [
            'id', 'title', 'slug', 'department', 'location', 'type', 
            'postedDate', 'deadline', 'description', 'metaDescription',
            'responsibilities', 'requirements', 'benefits'
        ]

    # Helper function to split text by newlines
    def _split_text(self, text):
        if not text:
            return []
        return [line.strip() for line in text.split('\n') if line.strip()]

    def get_responsibilities(self, obj):
        return self._split_text(obj.responsibilities)

    def get_requirements(self, obj):
        return self._split_text(obj.requirements)

    def get_benefits(self, obj):
        return self._split_text(obj.benefits)