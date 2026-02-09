#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "🚀 Starting Build Process..."

# 1. Install Dependencies
echo "📥 Installing dependencies..."
pip install --force-reinstall -r requirements.txt

# 2. [NUCLEAR FIX] FORCE-PATCH SETTINGS
# Since Git isn't updating settings.py, we force the correct storage backend here.
# This appends the fix to the end of the file on the server.
echo "🔧 FORCE-PATCHING settings.py..."
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
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'
" >> core/settings.py

# 3. Safe Cleanup & Setup
echo "🛠️  Preparing static directories..."
python -c "
import os
import shutil
# Ensure assets folder exists
if not os.path.exists('assets'):
    os.makedirs('assets')
"

# 4. Collect Static Files
# Now that settings are forced to be correct, this WILL work.
echo "📦 Collecting static files..."
python manage.py collectstatic --no-input --clear

# 5. Database Migrations
echo "🗄️  Applying database migrations..."
python manage.py makemigrations
python manage.py migrate

# 6. Create Superuser
echo "👤 Checking superuser..."
python manage.py shell << END
import os
from django.contrib.auth import get_user_model
User = get_user_model()
username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

if username and password and not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
    print(f"✅ Created superuser: {username}")
END

echo "✅ Build Finished Successfully!"