#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "🚀 Starting Build Process (In-Memory Patch Strategy)..."

# 1. Install Dependencies
pip install --force-reinstall -r requirements.txt

# 2. ENSURE ASSETS FOLDER EXISTS
# Prevents the "directory does not exist" warning
mkdir -p assets

# 3. RUN PYTHON BUILD SCRIPT
# We write a temporary Python script to run collectstatic.
# This allows us to modify the settings in memory, bypassing the file conflict.
echo "🔧 Running static file collection via Python script..."
python -c "
import os
import django
from django.conf import settings
from django.core.management import call_command

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

# --- THE FIX ---
# We force the storage engine to Standard Django Storage.
# This storage engine allows duplicates (Jazzmin overwrites Admin), solving the conflict.
settings.STORAGES = {
    'default': {'BACKEND': 'cloudinary_storage.storage.MediaCloudinaryStorage'},
    'staticfiles': {'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage'},
}
# Legacy support
settings.STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'

# Run the command
print('📦 Collecting static files with Forced Standard Storage...')
call_command('collectstatic', interactive=False, clear=True, verbosity=1)
"

# 4. MIGRATIONS & SUPERUSER
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