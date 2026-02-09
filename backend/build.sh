#!/usr/bin/env bash
# Exit on error
set -o errexit

# 1. Install Dependencies
# We use --force-reinstall to ensure all system files (like Django Admin) are fresh.
pip install --force-reinstall -r requirements.txt

# 2. DELETE THE ZOMBIE FOLDER (The Fix)
# We try to delete 'static' directly (if we are in backend)
# AND 'backend/static' (if we are in root).
# One of these will hit the target.
echo "Removing conflicting static folders..."
rm -rf static
rm -rf backend/static

# 3. Collect Static Files
# Now that the 'static' folder is gone, Django will only copy the correct system files.
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