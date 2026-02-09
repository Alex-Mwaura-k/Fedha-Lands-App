#!/usr/bin/env bash
# Exit on error
set -o errexit

# 1. Install Dependencies (Force reinstall to ensure system files are clean)
pip install --force-reinstall -r requirements.txt

# 2. DEEP SEARCH & DESTROY (The Fix)
# This Python script walks through the ENTIRE project tree.
# It finds ANY folder named 'admin' that lives inside a 'static' folder and deletes it.
python -c "
import os
import shutil

print('🕵️  Starting Deep Search for conflicting admin folders...')
base_dir = os.getcwd()

# Walk through every folder in the project
for root, dirs, files in os.walk(base_dir):
    # If we find a folder named 'static'
    if 'static' in dirs:
        static_path = os.path.join(root, 'static')
        # Check if that static folder contains an 'admin' folder
        admin_path = os.path.join(static_path, 'admin')
        if os.path.exists(admin_path):
            print(f'❌ DESTROYING CONFLICT: {admin_path}')
            shutil.rmtree(admin_path)

# Also ensure the 'assets' folder exists for settings.py
if not os.path.exists('assets'):
    print('✅ Creating assets folder...')
    os.makedirs('assets')
"

# 3. Collect Static Files
# Now that ALL conflicting 'admin' folders are gone, this will work.
python manage.py collectstatic --no-input --clear

# 4. Migrate & Superuser
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