#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "🚀 Starting Build Process..."

# 1. Install Dependencies
# We use --upgrade to ensure we get the latest compatible versions
echo "📥 Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# 2. Safe Setup
# Create the 'assets' folder if it's missing (prevents settings.py crash)
# We do NOT run any delete commands here to avoid accidental 'friendly fire'.
echo "🛠️  Preparing static directories..."
mkdir -p assets

# 3. Collect Static Files
# This will collect files from 'assets' and 'django.contrib.admin'
# and put them into 'staticfiles'. Standard Django storage handles conflicts automatically.
echo "📦 Collecting static files..."
python manage.py collectstatic --no-input --clear

# 4. Apply Database Migrations
echo "🗄️  Applying database migrations..."
python manage.py makemigrations
python manage.py migrate

# 5. Create Superuser (Automatic)
echo "👤 Checking superuser..."
python manage.py shell << END
import os
from django.contrib.auth import get_user_model
User = get_user_model()
username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

if username and password:
    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username, email, password)
        print(f"✅ Superuser '{username}' created.")
    else:
        print(f"ℹ️  Superuser '{username}' already exists.")
else:
    print("⚠️  Skipping superuser creation: Missing env variables.")
END

echo "✅ Build Finished Successfully!"