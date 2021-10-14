#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $DB_HOST $DB_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi


python manage.py flush --no-input --settings=intelect_kg.settings.set_local
python manage.py migrate --settings=intelect_kg.settings.set_local

exec "$@"
