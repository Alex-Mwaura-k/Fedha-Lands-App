"""
Django settings for core project.
"""

from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# --- SECURITY UPDATES ---
# Read from .env file, but provide safe fallbacks for local development
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-@ej58fuot$i$*e&0#o5k1q7_dhx)@(vo=tqvqz)c=&qtc4^@xz')

# In production, this should be False. In local dev, it defaults to True.
DEBUG = os.environ.get('DEBUG', 'True') == 'True'

# Allow local dev by default; add your production domain here later
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '127.0.0.1,localhost').split(',')


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

    # --- Fedha Apps ---
    'properties.apps.PropertiesConfig',
    'blog',
    'gallery',
    'testimonials',
    'careers',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', 
    'django.middleware.security.SecurityMiddleware',
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


# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
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
TIME_ZONE = 'Africa/Nairobi' # Updated for Kenya
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# --- MEDIA SETTINGS ---
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# --- CORS SETTINGS ---
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:4173",
    "http://127.0.0.1:5173",
]

# --- JAZZMIN SETTINGS ---
JAZZMIN_SETTINGS = {
    "site_title": "Fedha Admin",
    "site_header": "Fedha Land Ventures",
    "site_brand": "Fedha Admin",
    "welcome_sign": "Welcome to the Office Portal",
    "copyright": "Fedha Land Ventures Ltd",
    
    "hide_apps": ["blog", "gallery", "testimonials", "careers"],
    "hide_models": ["properties.property", "properties.location"],
    
    "custom_links": {
        "properties": [
            {"name": "Properties", "url": "admin:properties_property_changelist", "icon": "fas fa-home"},
            {"name": "Property Locations", "url": "admin:properties_location_changelist", "icon": "fas fa-map-marker-alt"}, 
            {"name": "Blog Posts", "url": "admin:blog_post_changelist", "icon": "fas fa-newspaper"},
            {"name": "Gallery", "url": "admin:gallery_galleryimage_changelist", "icon": "fas fa-images"},
            {"name": "Testimonials", "url": "admin:testimonials_testimonial_changelist", "icon": "fas fa-star"},
            {"name": "Careers", "url": "admin:careers_job_changelist", "icon": "fas fa-briefcase"},
            {"name": "Title Serials", "url": "admin:testimonials_validserial_changelist", "icon": "fas fa-barcode"},
        ],
    },

    "icons": {
        "auth.User": "fas fa-user-shield",
        "auth.Group": "fas fa-users",
        "properties.Location": "fas fa-map-marker-alt",
    },
    
    "order_with_respect_to": ["properties", "auth"],
    "show_ui_builder": False, # Set to False for cleaner production UI
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'