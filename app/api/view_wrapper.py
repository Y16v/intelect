import re
import json

from rest_framework.views import APIView
from rest_framework.response import Response
from api.factories.services.auth_service import AuthServiceFactory


class ViewWrapper(APIView):
    view_factory = None

    def dispatch(self, request, *args, **kwargs):
        auth_header = request.META.get("HTTP_AUTHORIZATION")
        if auth_header is None:
            logged_user_id = None
        else:
            access_token = auth_header.replace("Token ", "")
            kwargs.update({
                "token": access_token
            })
            logged_user_id = AuthServiceFactory().create().get_user_id_of_auth_token(access_token=access_token)
        kwargs.update({'logged_user_id': logged_user_id})
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        kwargs.update(request.GET.dict())
        kwargs.update({'headers': get_http_headers(request.META)})

        body, status = self.view_factory.create().get(*args, **kwargs)
        return Response(body, status=status, content_type='application/json')

    def post(self, request, *args, **kwargs):
        json_data = json.loads(str(request.body, encoding='utf-8'))
        kwargs.update(json_data)
        kwargs.update({'headers': get_http_headers(request.META)})

        body, status = self.view_factory.create(request).post(*args, **kwargs)
        return Response(body, status=status, content_type='application/json')

    def put(self, request, *args, **kwargs):
        json_data = json.loads(str(request.body, encoding='utf-8'))
        kwargs.update(json_data)
        kwargs.update({'headers': get_http_headers(request.META)})

        body, status = self.view_factory.create().put(*args, **kwargs)
        return Response(body, status=status, content_type='application/json')

    def delete(self, request, *args, **kwargs):
        json_data = json.loads(str(request.body, encoding='utf-8'))
        kwargs.update(json_data)
        kwargs.update({'headers': get_http_headers(request.META)})

        body, status = self.view_factory.create().delete(*args, **kwargs)
        return Response(body, status=status, content_type='application/json')


def get_http_headers(request_meta: {}) -> dict:
    regex = re.compile('^HTTP_')
    headers = dict((regex.sub('', header), value) for (header, value)
                   in request_meta.items() if header.startswith('HTTP_'))

    return headers
