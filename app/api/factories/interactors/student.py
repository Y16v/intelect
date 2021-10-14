from api.factories.entities.user import UserEntityFactory
from api.factories.repositories.result import ResultItemRepoFactory, ResultRepoFactory
from api.factories.repositories.school_repo import SchoolRepoFactory
from api.factories.repositories.user_repo import UserRepoFactory, UserCategoryRepoFactory
from api.factories.validators.school_validator import SchoolValidatorFactory
from api.factories.validators.user_category_validator import UserCategoryValidatorFactory
from api.factories.validators.user_permission_validator import UserPermissionValidatorFactory
from api.factories.validators.user_validator import UserValidatorFactory
from api.interactors.student import (SchoolStudentsListInteractor, SchoolStudentRetrieveInteractor,
                                     CreateStudentInteractor, GetPasswordStudentInteractor,
                                     SchoolStudentUpdateInteractor, GetRatingStudentsInteractor,
                                     SchoolStudentUpdateAccessInteractor, SearchStudentsInteractor,
                                     DeleteStudentInteractor)


class SchoolStudentsListInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        user_category_repo = UserCategoryRepoFactory.create()
        school_repo = SchoolRepoFactory.create()
        result_item_repo = ResultItemRepoFactory.create()

        return SchoolStudentsListInteractor(
            user_repo=user_repo,
            user_category_repo=user_category_repo,
            school_repo=school_repo,
            result_item_repo=result_item_repo
        )


class SchoolStudentRetrieveInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        user_category_repo = UserCategoryRepoFactory.create()
        school_repo = SchoolRepoFactory.create()

        return SchoolStudentRetrieveInteractor(
            user_repo=user_repo,
            user_category_repo=user_category_repo,
            school_repo=school_repo
        )


class SchoolStudentUpdateInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()
        user_validator = UserValidatorFactory.create()

        return SchoolStudentUpdateInteractor(
            user_repo=user_repo,
            user_permission_validator=user_permission_validator,
            user_validator=user_validator
        )


class SchoolStudentUpdateAccessInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        school_repo = SchoolRepoFactory.create()
        user_validator = UserValidatorFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()
        school_validator = SchoolValidatorFactory.create()

        return SchoolStudentUpdateAccessInteractor(
            user_repo=user_repo,
            school_repo=school_repo,
            user_validator=user_validator,
            user_permission_validator=user_permission_validator,
            school_validator=school_validator
        )


class CreateStudentInteractorFactory:
    @staticmethod
    def create():
        user_entity = UserEntityFactory.create()
        user_repo = UserRepoFactory.create()
        user_category_repo = UserCategoryRepoFactory.create()
        school_repo = SchoolRepoFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()
        user_validator = UserValidatorFactory.create()
        user_category_validator = UserCategoryValidatorFactory.create()
        school_validator = SchoolValidatorFactory.create()

        return CreateStudentInteractor(
            user_entity=user_entity,
            user_repo=user_repo,
            user_category_repo=user_category_repo,
            school_repo=school_repo,
            user_permission_validator=user_permission_validator,
            user_validator=user_validator,
            user_category_validator=user_category_validator,
            school_validator=school_validator
        )


class DeleteStudentInteractorFactory:

    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        user_category_repo = UserCategoryRepoFactory.create()
        school_repo = SchoolRepoFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()
        result_repo = ResultRepoFactory.create()
        result_item_repo = ResultItemRepoFactory.create()
        return DeleteStudentInteractor(
            user_repo=user_repo,
            user_category_repo=user_category_repo,
            school_repo=school_repo,
            user_permission_validator=user_permission_validator,
            result_repo=result_repo,
            result_item_repo=result_item_repo
        )


class GetPasswordStudentInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()
        return GetPasswordStudentInteractor(
            user_repo=user_repo,
            user_permission_validator=user_permission_validator
        )


class GetRatingStudentsInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        school_repo = SchoolRepoFactory.create()
        result_item_repo = ResultItemRepoFactory.create()
        return GetRatingStudentsInteractor(
            user_repo=user_repo,
            school_repo=school_repo,
            result_item_repo=result_item_repo
        )


class SearchStudentsInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        result_item_repo = ResultItemRepoFactory.create()
        school_repo = SchoolRepoFactory.create()

        return SearchStudentsInteractor(
            user_repo=user_repo,
            result_item_repo=result_item_repo,
            school_repo=school_repo
        )
