#!/usr/bin/env bash
# Exit on error
set -o errexit

# 1. Install Dependencies
pip install --force-reinstall -r requirements.txt

# 2. FIX FOLDERS USING PYTHON (No more path guessing)
# This script runs inside the backend folder and ensures paths are correct.
python -c "
import os, shutil

print(f'📍 Current working directory: {os.getcwd()}')

# Step A: Delete the 'static' folder if it exists (The Conflict Source)
if os.path.exists('static'):
    print('🗑️ Removing conflicting static folder...')
    shutil.rmtree('static')

# Step B: Create the 'assets' folder (The Clean Source)
if not os.path.exists('assets'):
    print('✅ Creating assets folder...')
    os.makedirs('assets')
"

# 3. Collect Static Files
# Now Django finds 'assets' (empty) and 'django.contrib.admin' (valid).
# It will copy the 165+ admin files correctly.
python manage.py collectstatic --no-input --clear

# 4. Apply Migrations
python manage.py migrate

# 5. Create Superuser
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