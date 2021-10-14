#!/bin/bash

git pull --rebase
git fetch

cp scripts/env/.env.staging .env

if [ ! -d "venv" ]; then
    virtualenv venv
fi
. venv/bin/activate
pip3 install -r app/requirements.txt
./app/manage.py migrate --settings=intelect_kg.settings.production --noinput
./app/manage.py crontab remove --settings=intelect_kg.settings.production
./app/manage.py crontab add --settings=intelect_kg.settings.production
deactivate

