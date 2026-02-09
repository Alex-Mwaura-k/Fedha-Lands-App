#!/usr/bin/env bash
# Exit on error
set -o errexit

# 1. FORCE REINSTALL DEPENDENCIES
# We use --force-reinstall to repair the Django files that were accidentally deleted.
pip install --force-reinstall -r requirements.txt

# 2. CLEANUP USER STATIC FOLDERS
# This removes your local 'static' folder to ensure no conflicts exist.
# We recreate it empty so Django doesn't complain.
rm -rf backend/static
mkdir -p backend/static

# 3. COLLECT STATIC FILES
python manage.py collectstatic --no-input --clear

# 4. MIGRATE DATABASE
python manage.py migrate

# 5. CREATE SUPERUSER
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