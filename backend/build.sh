#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "🚀 Starting Build Process (The Override Strategy)..."

# 1. Install Dependencies
pip install --force-reinstall -r requirements.txt

# 2. CREATE TEMPORARY BUILD SETTINGS
# We create a special settings file JUST for this build.
# This forces the "Safe" storage engine, ignoring whatever is in settings.py.
echo "🔧 Creating temporary build settings..."
echo "
from .settings import *
import os

# 1. Force Standard Storage (Ignores Jazzmin/Admin conflicts)
STORAGES = {
    'default': {'BACKEND': 'cloudinary_storage.storage.MediaCloudinaryStorage'},
    'staticfiles': {'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage'},
}
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'

# 2. Prevent 'directory does not exist' warnings
# We ensure STATICFILES_DIRS is empty for the build so it doesn't look for missing folders
STATICFILES_DIRS = []
" > core/build_settings.py

# 3. COLLECT STATIC FILES
# We use the --settings flag to use our Safe Config just for this step.
echo "📦 Collecting static files..."
python manage.py collectstatic --no-input --clear --settings=core.build_settings

# 4. CLEANUP
# Remove the temp file and restore the assets folder for the live app
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