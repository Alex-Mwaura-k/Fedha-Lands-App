from django.contrib import admin
from .models import GalleryItem

@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'item_type', 'description', 'created_at')
    list_filter = ('item_type',)
    search_fields = ('title', 'description')
    
    # Shows the "Alt Text" field as optional/read-only behavior since it auto-generates
    fieldsets = (
        ('Image Details', {
            'fields': ('item_type', 'title', 'image', 'description'),
            'description': "Fill in the details for the gallery card. Keep descriptions short."
        }),
        ('SEO (Optional)', {
            'fields': ('alt_text',),
            'classes': ('collapse',), # Hides this section by default since it's auto-filled
            'description': "Leave blank to auto-generate based on the Title."
        }),
    )