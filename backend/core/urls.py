from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

# 1. Import your Views
from properties.views import PropertyViewSet
from blog.views import PostViewSet
from gallery.views import GalleryViewSet
from testimonials.views import TestimonialViewSet
from careers.views import JobViewSet

# 2. Create the Router (The Traffic Controller)
router = DefaultRouter()
router.register(r'properties', PropertyViewSet)
router.register(r'blog', PostViewSet)
router.register(r'gallery', GalleryViewSet)
router.register(r'testimonials', TestimonialViewSet)
router.register(r'careers', JobViewSet)

# 3. Define the URL Patterns
urlpatterns = [
    path('admin/', admin.site.urls),
    
    # This wraps all your apps under the 'api/' prefix
    # Example: http://127.0.0.1:8000/api/properties/
    path('api/', include(router.urls)), 

] 

# 4. Allow Images to load during Development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)