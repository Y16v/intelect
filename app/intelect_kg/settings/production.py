from .base import *
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

DATABASES = {
    "default": {
        'ENGINE': 'django.db.backends.mysql',
        "NAME": os.environ.get("DB_DATABASE", os.path.join(BASE_DIR, "../../db.sqlite3")),
        "USER": os.environ.get("DB_USER", "user"),
        "PASSWORD": os.environ.get("DB_PASSWORD", "password"),
        "HOST": os.environ.get("DB_HOST", "localhost"),
        "PORT": os.environ.get("DB_PORT", "5432"),
    }
}


SENTRY_SDK_URL = os.getenv('SENTRY_SDK_URL')
ENV = os.getenv('ENV')
if ENV == 'production':
    sentry_sdk.init(
        dsn=SENTRY_SDK_URL,
        integrations=[DjangoIntegration()],
        send_default_pii=True
    )
