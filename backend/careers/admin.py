from django.contrib import admin
from .models import Job

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'department', 'deadline', 'is_active')
    list_filter = ('department', 'job_type', 'deadline')
    search_fields = ('title', 'department')
    prepopulated_fields = {'slug': ('title',)}

    def is_active(self, obj):
        from django.utils import timezone
        return obj.deadline >= timezone.now().date()
    is_active.boolean = True
    is_active.short_description = "Open?"