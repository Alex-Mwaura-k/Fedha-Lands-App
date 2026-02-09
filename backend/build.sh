#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "🚀 Starting Build Process..."

# 1. Install Dependencies
echo "📥 Installing dependencies..."
pip install --force-reinstall -r requirements.txt

# 2. [NUCLEAR FIX] FORCE-PATCH SETTINGS
# We echo a NEWLINE first to ensure we don't append to a comment line.
echo "🔧 FORCE-PATCHING settings.py..."
echo "" >> core/settings.py  # <--- CRITICAL NEWLINE FIX
echo "
# --- AUTO-PATCHED BY BUILD.SH ---
STORAGES = {
    'default': {
        'BACKEND': 'cloudinary_storage.storage.MediaCloudinaryStorage',
    },
    'staticfiles': {
        'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage',
    },
}
# Django 6.0 compatibility
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'
" >> core/settings.py

# 3. VERIFY SETTINGS (Debug Step)
# This will print the active storage engine to the logs. 
# If this says 'WhiteNoise', we know the patch failed.
echo "🧐 Verifying active storage engine..."
python -c "
import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()
from django.conf import settings
print(f'ACTIVE STATICFILES_STORAGE: {settings.STORAGES.get(\"staticfiles\", {}).get(\"BACKEND\")}')
"

# 4. AGGRESSIVE CLEANUP
# We delete the entire 'static' folder (source of conflicts), 
# keeping only 'assets' (your files) and 'staticfiles' (destination).
echo "🧹 Removing conflict sources..."
python -c "
import os
import shutil

if not os.path.exists('assets'):
    os.makedirs('assets')

# Walk and destroy any folder named 'static' (except the destination)
for root, dirs, files in os.walk('.'):
    if 'static' in dirs:
        path = os.path.join(root, 'static')
        if 'site-packages' not in path and 'staticfiles' not in path:
            print(f'❌ DELETING CONFLICT SOURCE: {path}')
            shutil.rmtree(path)
"

# 5. Collect Static Files
echo "📦 Collecting static files..."
python manage.py collectstatic --no-input --clear

# 6. Migrations & Superuser
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