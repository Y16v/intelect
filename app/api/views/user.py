from api.exceptions.decorators import catch_exception
from api.serializers.user import UserSerializer
from api.status_code import StatusCode
from api.views.base import View


class GetCurrentUserView(View):
    def __init__(self, get_current_user_interactor):
        self.get_current_user_interactor = get_current_user_interactor

    @catch_exception
    def get(self, logged_user_id, *args, **kwargs):
        user = self.get_current_user_interactor.set_params(logged_user_id).execute()
        body = UserSerializer.serialize(user)

        return body, StatusCode.OK


class UserChangePasswordView(View):
    def __init__(self, user_change_password_interactor):
        self.user_change_password_interactor = user_change_password_interactor

    @catch_exception
    def post(self, logged_user_id, old_password, new_password, confirm_password, *args, **kwargs):
        user = self.user_change_password_interactor.set_params(
            logged_user_id=logged_user_id,
            old_password=old_password,
            new_password=new_password,
            confirm_password=confirm_password
        ).execute()

        return UserSerializer.serialize(user), StatusCode.OK


class ChangeChildPasswordView(View):
    def __init__(self, change_child_password_interactor):
        self.change_child_password_interactor = change_child_password_interactor

    @catch_exception
    def post(self, logged_user_id, child_user_id, new_password, confirm_password, *args, **kwargs):
        self.change_child_password_interactor.set_params(
            logged_user_id=logged_user_id,
            child_user_id=child_user_id,
            new_password=new_password,
            confirm_password=confirm_password
        ).execute()

        return True, StatusCode.OK


class RetrieveUserView(View):
    def __init__(self, retrieve_user_interactor):
        self.retrieve_user_interactor = retrieve_user_interactor

    @catch_exception
    def get(self, logged_user_id, user_id, *args, **kwargs):
        user = self.retrieve_user_interactor.set_params(
            logged_user_id=logged_user_id,
            user_id=user_id
        ).execute()

        return UserSerializer.serialize(user), StatusCode.OK
