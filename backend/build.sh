#!/usr/bin/env bash
# Exit on error
set -o errexit

# 1. Install Dependencies
pip install -r requirements.txt

# 2. FORCE DELETE THE ZOMBIE 'admin' FOLDER
# This Python script finds any 'admin' folder inside 'static' and deletes it.
# It fixes the "0 files copied" error by removing the conflict source.
python -c "import os, shutil; [shutil.rmtree(os.path.join(root, d)) for root, dirs, files in os.walk('.') for d in dirs if d == 'admin' and 'static' in root]"

# 3. Collect Static Files
python manage.py collectstatic --no-input --clear

# 4. Apply Migrations
python manage.py migrate

# 5. Create Superuser (Optional)
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