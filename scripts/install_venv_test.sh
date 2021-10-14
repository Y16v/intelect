#!/bin/bash

if [ ! -d "venv" ]; then
    virtualenv venv
fi
. venv/bin/activate
pip3 install -r app/requirements.txt
deactivate
cp scripts/env/.env.dev .env
