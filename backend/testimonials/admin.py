from django.contrib import admin
from .models import Testimonial, ValidSerial

@admin.register(ValidSerial)
class ValidSerialAdmin(admin.ModelAdmin):
    list_display = ('serial_number', 'is_used')
    search_fields = ('serial_number',)
    list_filter = ('is_used',)
    readonly_fields = ('is_used',) # Keeps it safe from accidental clicks

    actions = ['reset_serial_usage']

    # --- NEW ACTION ---
    def reset_serial_usage(self, request, queryset):
        """Allows the admin to reset a serial number so the client can submit again."""
        rows_updated = queryset.update(is_used=False)
        self.message_user(request, f"{rows_updated} serial number(s) reset. Users can now submit reviews again.")
    reset_serial_usage.short_description = "♻️ Reset usage (Allow re-submission)"

# ... (TestimonialAdmin stays the same) ...
@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'rating', 'title_number_used', 'is_approved', 'date_submitted')
    list_filter = ('is_approved', 'rating', 'date_submitted')
    search_fields = ('name', 'text', 'title_number_used')
    
    fields = (
        'is_approved',
        'title_number_used',
        'name',
        'role',
        'location',
        'text',
        'rating',
        'image',
        'date_submitted'
    )
    readonly_fields = ('title_number_used', 'date_submitted')
    actions = ['approve_reviews', 'reject_reviews']

    def approve_reviews(self, request, queryset):
        queryset.update(is_approved=True)
        self.message_user(request, "Selected reviews are now LIVE.")
    approve_reviews.short_description = "✅ Approve selected reviews"

    def reject_reviews(self, request, queryset):
        queryset.update(is_approved=False)
        self.message_user(request, "Selected reviews have been hidden.")
    reject_reviews.short_description = "❌ Hide/Reject selected reviews"