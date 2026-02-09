#!/usr/bin/env bash
# Exit on error
set -o errexit

# 1. Install Dependencies
echo "📥 Installing dependencies..."
pip install --force-reinstall -r requirements.txt

# 2. NUCLEAR FIX: Force-Write the Correct Settings
# We append the correct storage configuration to the END of your settings file.
# This overrides whatever is currently inside the file.
echo "🔧 FORCE-PATCHING settings.py on the server..."
cat <<EOF >> core/settings.py

# [AUTO-PATCH FROM BUILD.SH]
# Forcing standard storage to bypass '0 files copied' error
STORAGES = {
    "default": {
        "BACKEND": "cloudinary_storage.storage.MediaCloudinaryStorage",
    },
    "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
    },
}
STATICFILES_STORAGE = "django.contrib.staticfiles.storage.StaticFilesStorage"
EOF

# 3. Clean & Prepare
echo "🧹 Cleaning up..."
python -c "
import os
import shutil
if not os.path.exists('assets'):
    os.makedirs('assets')
"

# 4. Collect Static Files
# Now that settings are forced to be correct, this WILL work.
echo "📦 Collecting static files..."
python manage.py collectstatic --no-input --clear

# 5. Migrations
echo "🗄️  Migrating database..."
python manage.py migrate

# 6. Create Superuser
echo "👤 Creating superuser..."
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