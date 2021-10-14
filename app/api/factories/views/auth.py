from api.factories.interactors.auth import LoginInteractorFactory, LoadUserActiveInteractorFactory
from api.views.auth import AuthView, LoadUserActiveView


class AuthViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        login_interactor_factory = LoginInteractorFactory.create()
        return AuthView(login_interactor_factory)


class LoadActiveUserViewFactory:
    @staticmethod
    def create():
        load_user_active_interactor = LoadUserActiveInteractorFactory.create()
        return LoadUserActiveView(load_user_active_interactor)
