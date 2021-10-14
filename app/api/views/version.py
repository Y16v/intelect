from django.http import JsonResponse
import os
from intelect_kg.settings import FRONTEND_DIR


def get_version(request):
    try:
        version_path = os.path.join(os.path.dirname(FRONTEND_DIR), 'version')
        version_file = open(version_path, 'r')
        version = version_file.readline()
    except FileNotFoundError:
        version = ""
    return JsonResponse({
        'version': version
    })