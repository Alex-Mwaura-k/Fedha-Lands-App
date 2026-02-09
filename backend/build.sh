#!/usr/bin/env bash
# Exit on error
set -o errexit

# 1. REPAIR DJANGO (Crucial!)
# We force reinstall to restore the admin files that were deleted by the previous script.
pip install --force-reinstall -r requirements.txt

# 2. CREATE CLEAN STATIC SOURCE
# We create an empty 'assets' folder. 
# This matches the new setting in settings.py.
rm -rf backend/assets
mkdir -p backend/assets

# 3. COLLECT STATIC
# Now Django looks in 'assets' (finds nothing) 
# AND looks in 'django.contrib.admin' (finds the restored files!).
python manage.py collectstatic --no-input --clear

# 4. MIGRATE & SUPERUSER
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