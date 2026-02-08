from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

# 1. Import your Views
from properties.views import PropertyViewSet, LocationViewSet
from blog.views import BlogPostViewSet, CategoryViewSet
from gallery.views import GalleryViewSet
from testimonials.views import TestimonialViewSet
from careers.views import JobViewSet
from leads.views import ContactViewSet, SubscriberViewSet, unsubscribe_user, SiteVisitViewSet, site_visit_receipt

# 2. Create the Router
router = DefaultRouter()
router.register(r'properties', PropertyViewSet)
router.register(r'locations', LocationViewSet)
router.register(r'blog', BlogPostViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'gallery', GalleryViewSet, basename='gallery')
router.register(r'testimonials', TestimonialViewSet)
router.register(r'careers', JobViewSet)
router.register(r'contact', ContactViewSet)       
router.register(r'subscribe', SubscriberViewSet)  
router.register(r'bookings', SiteVisitViewSet)

# 3. Define the URL Patterns
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), 
    
    # Standard Webpush URLs
    path('webpush/', include('webpush.urls')), 

    # --- Unsubscribe & Receipt Paths ---
    path('api/unsubscribe/', unsubscribe_user, name='unsubscribe'),
    path('api/receipt/<int:visit_id>/', site_visit_receipt, name='visit_receipt'),

    path("ckeditor5/", include('django_ckeditor_5.urls')), 
] 

# 4. Allow Images to load during Development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)