#!/usr/bin/env bash
# Exit on error
set -o errexit

# 1. Install Dependencies
# We force reinstall to restore the Django files that were deleted by the previous script.
pip install --force-reinstall -r requirements.txt

# 2. SAFER CLEANUP (Excludes .venv)
# This script cleans up your project but strictly AVOIDS hidden folders.
python -c "
import os
import shutil

print('🕵️  Starting Safe Search for conflicting admin folders...')
base_dir = os.getcwd()

for root, dirs, files in os.walk(base_dir):
    # CRITICAL: Skip hidden folders like .venv, .git, .render
    # This prevents the script from deleting Django's own files.
    dirs[:] = [d for d in dirs if not d.startswith('.')]

    if 'static' in dirs:
        static_path = os.path.join(root, 'static')
        admin_path = os.path.join(static_path, 'admin')
        
        # Only delete if it's NOT in a site-packages folder (double safety)
        if os.path.exists(admin_path) and 'site-packages' not in static_path:
            print(f'❌ DESTROYING CONFLICT: {admin_path}')
            shutil.rmtree(admin_path)

# Ensure assets folder exists for settings.py
if not os.path.exists('assets'):
    print('✅ Creating assets folder...')
    os.makedirs('assets')
"

# 3. Collect Static Files
# Now that we haven't deleted the system files, this will find ~165 files.
python manage.py collectstatic --no-input --clear

# 4. Migrate & Create Superuser
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