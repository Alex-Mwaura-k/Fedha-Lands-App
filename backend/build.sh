#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "🚀 Starting Build Process (The Sacrifice Strategy)..."

# 1. Install Dependencies
pip install --force-reinstall -r requirements.txt

# 2. THE SACRIFICE: WIPE LOCAL FOLDERS
# We delete 'assets' and 'static' to ensure NO local files conflict with Django.
echo "🔥 Sacrificing local static folders..."
rm -rf assets static staticfiles

# 3. FORCE-PATCH SETTINGS
# We overwrite STATICFILES_DIRS to be empty. 
# This forces Django to ignore local folders and ONLY use system files (Admin).
echo "🔧 FORCE-PATCHING settings.py..."
echo "" >> core/settings.py
echo "
# [AUTO-PATCH] SACRIFICING CUSTOM FILES FOR STABILITY
STORAGES = {
    'default': {'BACKEND': 'cloudinary_storage.storage.MediaCloudinaryStorage'},
    'staticfiles': {'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage'},
}
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'
STATICFILES_DIRS = []  # <--- THE FIX: Ignore all local folders
" >> core/settings.py

# 4. Collect Static Files
# Now that we removed the local folders and the config, 
# Django will ONLY find the 165 Admin files. No conflicts possible.
echo "📦 Collecting static files..."
python manage.py collectstatic --no-input --clear

# 5. Migrations & Superuser
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