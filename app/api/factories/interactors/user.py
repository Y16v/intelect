from api.factories.validators.user_permission_validator import UserPermissionValidatorFactory
from api.factories.validators.user_validator import UserValidatorFactory
from api.interactors.user import GetCurrentUserInteractor, UserChangePasswordInteractor, ChangeChildPasswordInteractor, \
    RetrieveUserInteractor
from api.factories.repositories.user_repo import UserRepoFactory
from api.factories.repositories.result import ResultItemRepoFactory
from api.factories.repositories.school_repo import SchoolRepoFactory


class GetCurrentUserInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        school_repo = SchoolRepoFactory.create()
        result_item_repo = ResultItemRepoFactory.create()

        return GetCurrentUserInteractor(
            user_repo=user_repo,
            school_repo=school_repo,
            result_item_repo=result_item_repo
        )


class UserChangePasswordInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()

        return UserChangePasswordInteractor(
            user_repo=user_repo
        )


class ChangeChildPasswordInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()
        user_validator = UserValidatorFactory.create()

        return ChangeChildPasswordInteractor(
            user_repo=user_repo,
            user_permission_validator=user_permission_validator,
            user_validator=user_validator
        )


class RetrieveUserInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()
        result_item_repo = ResultItemRepoFactory.create()

        return RetrieveUserInteractor(
            user_repo=user_repo,
            result_item_repo=result_item_repo,
            user_permission_validator=user_permission_validator
        )
