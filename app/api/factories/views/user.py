from api.views.user import GetCurrentUserView, UserChangePasswordView, ChangeChildPasswordView, RetrieveUserView
from api.factories.interactors.user import GetCurrentUserInteractorFactory, UserChangePasswordInteractorFactory, \
    ChangeChildPasswordInteractorFactory, RetrieveUserInteractorFactory


class GetCurrentUserViewFactory:
    @staticmethod
    def create():
        return GetCurrentUserView(
            GetCurrentUserInteractorFactory.create()
        )


class UserChangePasswordViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        user_change_password_interactor = UserChangePasswordInteractorFactory.create()

        return UserChangePasswordView(
            user_change_password_interactor=user_change_password_interactor
        )


class ChangeChildPasswordViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        change_child_password_interactor = ChangeChildPasswordInteractorFactory.create()

        return ChangeChildPasswordView(
            change_child_password_interactor=change_child_password_interactor
        )


class RetrieveUserViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        retrieve_user_interactor = RetrieveUserInteractorFactory.create()

        return RetrieveUserView(
            retrieve_user_interactor=retrieve_user_interactor
        )
