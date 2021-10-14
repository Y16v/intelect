from api.factories.repositories.school_repo import SchoolRepoFactory
from api.factories.repositories.user_repo import UserRepoFactory, UserCategoryRepoFactory
from api.factories.validators.school_validator import SchoolValidatorFactory
from api.factories.validators.user_permission_validator import UserPermissionValidatorFactory
from api.factories.validators.user_validator import UserValidatorFactory
from api.interactors.teacher import GetSchoolTeachersInteractor, SchoolTeacherUpdateInteractor, \
    SchoolTeacherUpdateAccessInteractor


class GetSchoolTeacherInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        user_category_repo = UserCategoryRepoFactory.create()
        school_repo = SchoolRepoFactory.create()

        return GetSchoolTeachersInteractor(
            user_repo=user_repo, 
            user_category_repo=user_category_repo,
            school_repo=school_repo
            )


class SchoolTeacherUpdateInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()
        user_validator = UserValidatorFactory.create()

        return SchoolTeacherUpdateInteractor(
            user_repo=user_repo,
            user_permission_validator=user_permission_validator,
            user_validator=user_validator
        )


class SchoolTeacherUpdateAccessInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        school_repo = SchoolRepoFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()
        user_validator = UserValidatorFactory.create()
        school_validator = SchoolValidatorFactory.create()

        return SchoolTeacherUpdateAccessInteractor(
            user_repo=user_repo,
            school_repo=school_repo,
            user_permission_validator=user_permission_validator,
            user_validator=user_validator,
            school_validator=school_validator
        )
