from api.factories.entities.group import GroupEntityFactory
from api.factories.repositories.group import GroupRepoFactory
from api.factories.repositories.user_repo import UserRepoFactory
from api.factories.validators.group_validator import GroupValidatorFactory
from api.factories.validators.user_permission_validator import UserPermissionValidatorFactory
from api.factories.validators.user_validator import UserValidatorFactory
from api.interactors.group import GroupListInteractor, SchoolGroupCreateInteractor, SchoolGroupUpdateInteractor, \
    SchoolGroupRetrieveInteractor, SchoolGroupDeleteInteractor


class SchoolGroupListInteractorFactory:
    @staticmethod
    def create():
        group_repo = GroupRepoFactory.create()
        user_repo = UserRepoFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()

        return GroupListInteractor(
            group_repo=group_repo,
            user_repo=user_repo,
            user_permission_validator=user_permission_validator
        )


class SchoolGroupCreateInteractorFactory:
    @staticmethod
    def create():
        group_repo = GroupRepoFactory.create()
        user_repo = UserRepoFactory.create()
        group_entity = GroupEntityFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()
        user_validator = UserValidatorFactory.create()

        return SchoolGroupCreateInteractor(
            group_repo=group_repo,
            user_repo=user_repo,
            group_entity=group_entity,
            user_permission_validator=user_permission_validator,
            user_validator=user_validator
        )


class SchoolGroupRetrieveInteractorFactory:
    @staticmethod
    def create():
        group_repo = GroupRepoFactory.create()
        user_repo = UserRepoFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()

        return SchoolGroupRetrieveInteractor(
            group_repo=group_repo,
            user_repo=user_repo,
            user_permission_validator=user_permission_validator
        )


class SchoolGroupUpdateInteractorFactory:
    @staticmethod
    def create():
        group_repo = GroupRepoFactory.create()
        user_repo = UserRepoFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()
        group_validator = GroupValidatorFactory.create()

        return SchoolGroupUpdateInteractor(
            group_repo=group_repo,
            user_repo=user_repo,
            user_permission_validator=user_permission_validator,
            group_validator=group_validator
        )


class SchoolGroupDeleteInteractorFactory:
    @staticmethod
    def create():
        group_repo = GroupRepoFactory.create()
        user_repo = UserRepoFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()

        return SchoolGroupDeleteInteractor(
            group_repo=group_repo,
            user_repo=user_repo,
            user_permission_validator=user_permission_validator
        )
