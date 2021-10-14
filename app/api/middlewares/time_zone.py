from django.conf import settings
from django.utils import timezone
from django.utils.deprecation import MiddlewareMixin


class ActivateTimeZoneMiddleware(MiddlewareMixin):
    def process_request(self, request):
        timezone_name = request.META.get('HTTP_TIME_ZONE') or settings.DEFAULT_TIMEZONE_FOR_ACTIVATE
        timezone.activate(timezone_name)
