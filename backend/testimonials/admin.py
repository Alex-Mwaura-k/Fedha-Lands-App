from django.contrib import admin
from .models import ValidSerial, Testimonial

@admin.register(ValidSerial)
class ValidSerialAdmin(admin.ModelAdmin):
    list_display = ('serial_number', 'owner_name')
    search_fields = ('serial_number', 'owner_name')

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_approved', 'created_at')
    list_filter = ('is_approved',)
    actions = ['approve_testimonials']

    def approve_testimonials(self, request, queryset):
        queryset.update(is_approved=True)
    approve_testimonials.short_description = "Mark selected reviews as Approved"