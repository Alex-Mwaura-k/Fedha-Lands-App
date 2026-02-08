from django.contrib import admin
from django.forms.models import BaseInlineFormSet
from django.core.exceptions import ValidationError
from .models import Property, PropertyImage, Location, PropertyFeature

# --- 1. VALIDATION LOGIC: Enforce Minimum 2 Features ---
class FeatureInlineFormSet(BaseInlineFormSet):
    def clean(self):
        super().clean()
        # Count how many features are being added (excluding ones marked for deletion)
        count = 0
        for form in self.forms:
            if form.cleaned_data and not form.cleaned_data.get('DELETE', False):
                count += 1
        
        if count < 2:
            raise ValidationError("You must list at least 2 features for this property.")

# --- 2. ADMIN CONFIGURATION ---

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('name',)

class FeatureInline(admin.TabularInline):
    model = PropertyFeature
    formset = FeatureInlineFormSet  # <--- Connects the validator above
    extra = 3 
    verbose_name = "Feature"
    verbose_name_plural = "Property Features" # <--- Renamed correctly

class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 3
    verbose_name = "Gallery Image"
    verbose_name_plural = "More Property Images"

class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'price', 'status')
    list_filter = ('status', 'location')
    search_fields = ('title', 'location__name')
    prepopulated_fields = {'slug': ('title',)} 
    
    inlines = [FeatureInline, PropertyImageInline]

admin.site.register(Property, PropertyAdmin)