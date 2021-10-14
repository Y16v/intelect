#!/bin/bash

BUILD_TO_DEPLOY=${1}

git pull --rebase
git fetch
git fetch --tags
git checkout $BUILD_TO_DEPLOY

cp scripts/env/.env.production .env

if [ ! -d "venv" ]; then
    virtualenv venv
fi
. venv/bin/activate
pip3 install -r app/requirements.txt
./app/manage.py migrate --settings=intelect_kg.settings.production --noinput
./app/manage.py crontab remove --settings=intelect_kg.settings.production
./app/manage.py crontab add --settings=intelect_kg.settings.production
deactivate

