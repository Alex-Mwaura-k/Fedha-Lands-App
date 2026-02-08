from rest_framework import serializers
from .models import BlogPost, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class BlogPostSerializer(serializers.ModelSerializer):
    # Sends the category name (e.g. "Investment") to the frontend
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'post_type', 'title', 'slug', 'category', 
            'category_name', 'description', 'meta_description', 
            'image', 'content', 'video_url', 'date_published'
        ]