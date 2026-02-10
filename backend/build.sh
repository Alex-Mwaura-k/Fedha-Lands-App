#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "🚀 Starting Build Process (Isolation Strategy)..."

# 1. Install Dependencies
pip install --force-reinstall -r requirements.txt

# 2. CREATE ISOLATED BUILD SETTINGS
# We create a settings file that REMOVES the problematic apps for the build.
echo "🔧 Creating isolated build settings..."
python -c "
import os

config = \"\"\"
from .settings import *

# 1. REMOVE CLOUDINARY STORAGE APP
# This stops it from hijacking the collectstatic command
if 'cloudinary_storage' in INSTALLED_APPS:
    INSTALLED_APPS.remove('cloudinary_storage')

# 2. FORCE STANDARD DJANGO STORAGE
# This ensures we use the built-in, conflict-tolerant storage engine
STORAGES = {
    'default': {
        'BACKEND': 'django.core.files.storage.FileSystemStorage',
    },
    'staticfiles': {
        'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage',
    },
}
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'

# 3. EMPTY LOCAL DIRS TO PREVENT MISSING FOLDER ERRORS
STATICFILES_DIRS = []
\"\"\"

with open('core/build_settings.py', 'w') as f:
    f.write(config)
"

# 3. COLLECT STATIC FILES
# Now we run the command using our 'clean' settings.
# Without 'cloudinary_storage' installed, Django WILL overwrite duplicates.
echo "📦 Collecting static files (Isolated)..."
python manage.py collectstatic --no-input --clear --settings=core.build_settings

# 4. CLEANUP
rm core/build_settings.py
mkdir -p assets

# 5. MIGRATIONS & SUPERUSER
echo "🗄️  Database operations..."
python manage.py migrate
python manage.py shell << END
import os
from django.contrib.auth import get_user_model
User = get_user_model()
username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')
if username and password and not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
END

echo "✅ Build Finished Successfully!"