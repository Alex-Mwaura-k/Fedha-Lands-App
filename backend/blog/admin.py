from django.contrib import admin
from .models import BlogPost, Category

# Re-registered Category so you can add/edit them
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'post_type', 'category', 'date_published')
    list_filter = ('post_type', 'category', 'date_published')
    search_fields = ('title', 'category__name') 
    prepopulated_fields = {'slug': ('title',)}

    fieldsets = (
        ('General Information', {
            'fields': ('post_type', 'title', 'slug', 'category', 'description', 'meta_description')
        }),
        ('Article Content', {
            'fields': ('image', 'content'),
            'description': "Use this section for written articles only."
        }),
        ('Video Information', {
            'fields': ('video_url',), # Only one video field
            'description': "Use this section for YouTube videos."
        }),
    )

    class Media:
        # High-speed script for instant tab switching
        js = ('admin/js/blog_admin.js',)