from rest_framework import viewsets, pagination
from .models import BlogPost, Category
from .serializers import BlogPostSerializer, CategorySerializer

# Custom pagination class
class BlogPagination(pagination.PageNumberPagination):
    page_size = 33 
    page_size_query_param = 'page_size'
    max_page_size = 100

class BlogPostViewSet(viewsets.ModelViewSet):
    """
    Handles fetching all blog posts, ordered by date.
    Pagination is applied here (33 items per page).
    """
    queryset = BlogPost.objects.all().order_by('-date_published')
    serializer_class = BlogPostSerializer
    pagination_class = BlogPagination
    lookup_field = 'slug'

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Handles fetching categories for the frontend filter.
    """
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    pagination_class = None