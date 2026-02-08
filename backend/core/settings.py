"""
Django settings for core project - PRODUCTION READY FOR RENDER
"""
from pathlib import Path
import os
import dj_database_url  # <--- CRITICAL IMPORT FOR RENDER
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
# =========================================================
# [RENDER] SECURITY CONFIGURATION
# =========================================================
# 1. SECRET KEY: Reads from Environment, falls back to unsafe key ONLY locally
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-fallback-key-for-local-dev-only')

# 2. DEBUG: Defaults to False (Secure) unless you explicitly set it to 'True' in your .env
DEBUG = os.environ.get('DEBUG', 'False') == 'True'

# 3. ALLOWED HOSTS: Allow your API subdomain, main domain, and Render's URL
ALLOWED_HOSTS = [
    'api.fedhalandventures.co.ke',    # Your Backend Subdomain
    'fedhalandventures.co.ke',        # Your Main Domain
    'www.fedhalandventures.co.ke',
    'localhost',
    '127.0.0.1'
]

# Automatically add the Render URL (e.g., fedha-backend.onrender.com)
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

# 4. CSRF TRUSTED ORIGINS
CSRF_TRUSTED_ORIGINS = [
    'https://api.fedhalandventures.co.ke',
    'https://fedhalandventures.co.ke',
    'https://www.fedhalandventures.co.ke',
]
# Trust the Render URL for CSRF too
if RENDER_EXTERNAL_HOSTNAME:
    CSRF_TRUSTED_ORIGINS.append(f'https://{RENDER_EXTERNAL_HOSTNAME}')

# Application definition
INSTALLED_APPS = [
    'jazzmin', 
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # --- Third Party Tools ---
    'rest_framework',
    'corsheaders',
    'django_ckeditor_5',
    'django_filters',
    'webpush',

    # --- Fedha Apps ---
    'properties.apps.PropertiesConfig',
    'blog',
    'gallery',
    'testimonials',
    'careers',
    'leads',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # MUST BE FIRST
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # Essential for serving static files on Render
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


# =========================================================
# [RENDER] DATABASE CONFIGURATION (PostgreSQL)
# =========================================================
# This automatically switches between SQLite (Local) and PostgreSQL (Render)
DATABASES = {
    'default': dj_database_url.config(
        # Look for DATABASE_URL in environment, otherwise fall back to local SQLite
        default='sqlite:///' + str(BASE_DIR / 'db.sqlite3'),
        conn_max_age=600
    )
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    { 'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', },
]


# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Africa/Nairobi'
USE_I18N = True
USE_TZ = True


# =========================================================
# [RENDER] STATIC FILES & MEDIA
# =========================================================
STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

# Whitenoise is perfect for Render
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


# =========================================================
# CORS SETTINGS
# =========================================================
# Allow your React Frontend to talk to this Backend
CORS_ALLOWED_ORIGINS = [
    "https://fedhalandventures.co.ke",
    "https://www.fedhalandventures.co.ke",
    "http://localhost:5173",
    "http://localhost:4173",
]


# =========================================================
# EMAIL SETTINGS
# =========================================================
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'tralexmwaurakariuki@gmail.com'
# SECURE: Reads password from Environment Variable
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '') 


# =========================================================
# JAZZMIN (ADMIN THEME) SETTINGS
# =========================================================
JAZZMIN_SETTINGS = {
    "site_title": "Fedha Admin",
    "site_header": "Fedha Land Ventures",
    "site_brand": "Fedha Admin",
    "welcome_sign": "Welcome to the Office Portal",
    "copyright": "Fedha Land Ventures Ltd",
    
    "hide_models": [
        "blog.blogpost", 
        "properties.property", 
        "properties.location", 
        "leads.custombroadcast", 
        "leads.sitevisit",   
        "leads.contact",     
        "leads.subscriber",  
        "leads.emailblast",  
    ], 
    
    "hide_apps": ["blog", "gallery", "testimonials", "careers", "webpush"], 
    
    "custom_links": {
        "properties": [
            {"name": "Properties", "url": "admin:properties_property_changelist", "icon": "fas fa-home"},
            {"name": "Property Locations", "url": "admin:properties_location_changelist", "icon": "fas fa-map-marker-alt"}, 
            {"name": "Blog Posts", "url": "admin:blog_blogpost_changelist", "icon": "fas fa-newspaper"},
            {"name": "Gallery", "url": "admin:gallery_galleryitem_changelist", "icon": "fas fa-images"},
            {"name": "Testimonials", "url": "admin:testimonials_testimonial_changelist", "icon": "fas fa-star"},
            {"name": "Title Serials", "url": "admin:testimonials_validserial_changelist", "icon": "fas fa-barcode"},
            {"name": "Careers", "url": "admin:careers_job_changelist", "icon": "fas fa-briefcase"},
        ],

        "leads": [
            {"name": "Client Contact Messages", "url": "admin:leads_contact_changelist", "icon": "fas fa-envelope-open-text"},
            {"name": "Site Visit Bookings", "url": "admin:leads_sitevisit_changelist", "icon": "fas fa-calendar-check"},
            {"name": "Send Custom Email", "url": "admin:leads_emailblast_add", "icon": "fas fa-paper-plane", "permissions": ["leads.add_emailblast"]},
            {"name": "Send Notifications", "url": "admin:leads_custombroadcast_add", "icon": "fas fa-bullhorn", "permissions": ["leads.add_custombroadcast"]},
            {"name": "Newsletter Subscribers", "url": "admin:leads_subscriber_changelist", "icon": "fas fa-users"},
            {"name": "Push Subscribers", "url": "admin:webpush_pushinformation_changelist", "icon": "fas fa-mobile-alt"},
        ],
    },

    "icons": {
        "auth.User": "fas fa-user-shield",
        "auth.Group": "fas fa-users",
        "properties.Location": "fas fa-map-marker-alt",
        "leads.SiteVisit": "fas fa-calendar-check",
        "leads.CustomBroadcast": "fas fa-bullhorn",
    },
    
    "order_with_respect_to": ["properties", "auth","leads"],
    "show_ui_builder": False, 
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CKEDITOR_5_CONFIGS = {
    'default': {
        'toolbar': ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable', 'undo', 'redo'],
    },
    'extends': {
        'blockToolbar': ['paragraph', 'heading1', 'heading2', 'heading3'],
        'toolbar': ['heading', '|', 'bold', 'italic', 'link', 'underline', 'strikethrough', 'highlight', '|', 'bulletedList', 'numberedList', '|', 'blockQuote', 'insertTable', '|', 'undo', 'redo'],
    }
}

# --- SECURE WEBPUSH SETTINGS ---
# These now read from your .env file or Render Dashboard
WEBPUSH_SETTINGS = {
    "VAPID_PUBLIC_KEY": os.environ.get('VAPID_PUBLIC_KEY', ''),
    "VAPID_PRIVATE_KEY": os.environ.get('VAPID_PRIVATE_KEY', ''),
    "VAPID_ADMIN_EMAIL": os.environ.get('VAPID_ADMIN_EMAIL', 'admin@fedhalandventures.co.ke')
}