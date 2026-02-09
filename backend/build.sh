#!/usr/bin/env bash
# Exit on error
set -o errexit

# 1. Install Dependencies
# We use --force-reinstall to RESTORE the Django Admin files 
# that were accidentally deleted by the previous aggressive script.
echo "📥 Installing dependencies..."
pip install --force-reinstall -r requirements.txt

# 2. SAFER CLEANUP (Excludes .venv)
# This Python script cleans up conflicting 'admin' folders from YOUR apps,
# but it strictly IGNORES hidden folders like .venv to protect Django.
echo "🧹 Starting safe cleanup of conflicting static files..."
python -c "
import os
import shutil

print('🕵️  Searching for conflicting admin folders...')
base_dir = os.getcwd()

# Ensure assets folder exists so settings.py doesn't crash
if not os.path.exists('assets'):
    print('✅ Creating assets folder...')
    os.makedirs('assets')

for root, dirs, files in os.walk(base_dir):
    # CRITICAL: Skip hidden folders like .venv, .git, .render
    # This prevents the script from searching inside the system folders
    dirs[:] = [d for d in dirs if not d.startswith('.')]

    if 'static' in dirs:
        static_path = os.path.join(root, 'static')
        admin_path = os.path.join(static_path, 'admin')
        
        # Only delete if it exists AND it's not inside site-packages (double safety)
        if os.path.exists(admin_path) and 'site-packages' not in static_path:
            print(f'❌ DESTROYING CONFLICT: {admin_path}')
            shutil.rmtree(admin_path)
"

# 3. Collect Static Files
# Now that system files are restored and conflicts are gone, this should work.
echo "📦 Collecting static files..."
python manage.py collectstatic --no-input --clear

# 4. Database Migrations
echo "🗄️  Applying database migrations..."
python manage.py makemigrations
python manage.py migrate

# 5. Create Superuser (Optional)
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
else:
    print("ℹ️ Superuser already exists or credentials missing")
END