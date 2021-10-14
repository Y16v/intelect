from api.factories.repositories.school_repo import SchoolRepoFactory
from api.factories.repositories.user_repo import UserRepoFactory, UserCategoryRepoFactory
from api.factories.services.auth_service import AuthServiceFactory
from api.interactors.login.login import LoginInteractor, LoadUserActiveInteractor
from api.factories.repositories.package_type_repo import PackageTypeRepoFactory


class LoginInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        auth_service = AuthServiceFactory.create()
        package_type_repo = PackageTypeRepoFactory.create()
        return LoginInteractor(user_repo, auth_service, package_type_repo)


class LoadUserActiveInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        school_repo = SchoolRepoFactory.create()
        user_category_repo = UserCategoryRepoFactory.create()
        package_type_repo = PackageTypeRepoFactory.create()
        return LoadUserActiveInteractor(
            user_repo=user_repo,
            school_repo=school_repo,
            user_category_repo=user_category_repo,
            package_type_repo = package_type_repo
        )