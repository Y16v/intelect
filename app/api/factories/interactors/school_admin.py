from api.factories.repositories.school_repo import SchoolRepoFactory
from api.factories.validators.user_permission_validator import UserPermissionValidatorFactory
from api.factories.validators.user_validator import UserValidatorFactory
from api.interactors.school_admin import SchoolAdminCreateInteractor, SchoolAdminRetrieveInteractor, \
    SchoolAdminUpdateInteractor
from api.factories.repositories.user_repo import UserCategoryRepoFactory, UserRepoFactory
from api.factories.entities.user import UserEntityFactory


class SchoolAdminCreateInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        user_category_repo = UserCategoryRepoFactory.create()
        user_entity = UserEntityFactory.create()
        user_validator = UserValidatorFactory.create()

        return SchoolAdminCreateInteractor(
            user_repo=user_repo,
            user_category_repo=user_category_repo,
            user_entity=user_entity,
            user_validator=user_validator
        )


class SchoolAdminRetrieveInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        user_category_repo = UserCategoryRepoFactory.create()
        school_repo = SchoolRepoFactory.create()
        user_entity = UserEntityFactory.create()

        return SchoolAdminRetrieveInteractor(
            user_repo=user_repo,
            user_category_repo=user_category_repo,
            school_repo=school_repo,
            user_entity=user_entity
        )


class SchoolAdminUpdateInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        user_category_repo = UserCategoryRepoFactory.create()
        school_repo = SchoolRepoFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()
        user_validator = UserValidatorFactory.create()

        return SchoolAdminUpdateInteractor(
            user_repo=user_repo,
            user_category_repo=user_category_repo,
            school_repo=school_repo,
            user_permission_validator=user_permission_validator,
            user_validator=user_validator
        )
