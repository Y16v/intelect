from api.exceptions.decorators import catch_exception
from api.serializers.auth import AuthTokenSerializer
from api.status_code import StatusCode
from api.views.base import View


class AuthView(View):

    def __init__(self, login_interactor):
        self.login_interactor = login_interactor

    @catch_exception
    def post(self, username, password, **kwargs):
        auth_token = self.login_interactor.set_params(username, password).execute()
        result = AuthTokenSerializer.create(auth_token)
        status = StatusCode.OK
        return result, status


class LoadUserActiveView(View):
    def __init__(self, load_user_active_interactor):
        self.load_user_active_interactor = load_user_active_interactor

    @catch_exception
    def get(self, logged_user_id, *args, **kwargs):
        body = self.load_user_active_interactor.set_params(logged_user_id).execute()
        status = StatusCode.OK
        return body, status

