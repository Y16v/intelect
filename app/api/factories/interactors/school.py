from api.factories.repositories.package_type_repo import PackageTypeRepoFactory
from api.factories.validators.package_type_validator import PackageTypeValidatorFactory
from api.factories.validators.school_validator import SchoolValidatorFactory
from api.factories.validators.user_permission_validator import UserPermissionValidatorFactory
from api.interactors.school import (
    SchoolListInteractor,
    SchoolCreateInteractor,
    RetrieveSchoolInteractor,
    UpdateSchoolInteractor,
    DeleteSchoolInteractor,
    UpdateSchoolPackageTypeInteractor, UpdateSchoolPackageInteractor, SearchSchoolsInteractor)
from api.factories.repositories.user_repo import UserRepoFactory, UserCategoryRepoFactory
from api.factories.repositories.school_repo import SchoolRepoFactory
from api.factories.entities.school import SchoolEntityFactory
from api.validators.user_permission_validator import UserPermissionValidator


class SchoolListInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        user_category_repo = UserCategoryRepoFactory.create()
        school_repo = SchoolRepoFactory.create()

        return SchoolListInteractor(
            user_repo=user_repo,
            user_category_repo=user_category_repo,
            school_repo=school_repo
        )


class SchoolCreateInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        user_category_repo = UserCategoryRepoFactory.create()
        school_repo = SchoolRepoFactory.create()
        school_entity = SchoolEntityFactory.create()
        school_validator = SchoolValidatorFactory.create()

        return SchoolCreateInteractor(
            user_repo=user_repo,
            user_category_repo=user_category_repo,
            school_repo=school_repo,
            school_entity=school_entity,
            school_validator=school_validator
        )


class SearchSchoolsInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        user_category_repo = UserCategoryRepoFactory.create()
        school_repo = SchoolRepoFactory.create()

        return SearchSchoolsInteractor(
            user_repo=user_repo,
            user_category_repo=user_category_repo,
            school_repo=school_repo
        )


class RetrieveSchoolInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        user_category_repo = UserCategoryRepoFactory.create()
        school_repo = SchoolRepoFactory.create()
        package_type_repo = PackageTypeRepoFactory.create()

        return RetrieveSchoolInteractor(
            user_repo=user_repo,
            user_category_repo=user_category_repo,
            school_repo=school_repo,
            package_type_repo=package_type_repo
        )


class UpdateSchoolInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        user_category_repo = UserCategoryRepoFactory.create()
        school_repo = SchoolRepoFactory.create()
        school_entity = SchoolEntityFactory.create()
        school_validator = SchoolValidatorFactory.create()

        return UpdateSchoolInteractor(
            user_repo=user_repo,
            user_category_repo=user_category_repo,
            school_repo=school_repo,
            school_entity=school_entity,
            school_validator=school_validator
        )


class DeleteSchoolInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        user_category_repo = UserCategoryRepoFactory.create()
        school_repo = SchoolRepoFactory.create()

        return DeleteSchoolInteractor(
            user_repo=user_repo,
            user_category_repo=user_category_repo,
            school_repo=school_repo
        )


class UpdateSchoolPackageTypeInteractorFactory:
    @staticmethod
    def create():
        school_repo = SchoolRepoFactory.create()
        package_type_repo = PackageTypeRepoFactory.create()
        school_entity = SchoolEntityFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()
        school_validator = SchoolValidatorFactory.create()
        package_type_validator = PackageTypeValidatorFactory.create()

        return UpdateSchoolPackageTypeInteractor(
            school_repo=school_repo,
            package_type_repo=package_type_repo,
            school_entity=school_entity,
            user_permission_validator=user_permission_validator,
            school_validator=school_validator,
            package_type_validator=package_type_validator
        )


class UpdateSchoolPackageInteractorFactory:
    @staticmethod
    def create():
        school_repo = SchoolRepoFactory.create()
        package_type_repo = PackageTypeRepoFactory.create()
        school_entity = SchoolEntityFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()

        return UpdateSchoolPackageInteractor(
            school_repo=school_repo,
            package_type_repo=package_type_repo,
            school_entity=school_entity,
            user_permission_validator=user_permission_validator
        )
