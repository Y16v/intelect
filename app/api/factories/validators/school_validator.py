from api.validators.school_validator import SchoolValidator

from api.factories.repositories.user_repo import UserCategoryRepoFactory, UserRepoFactory
from api.factories.repositories.school_repo import SchoolRepoFactory


class SchoolValidatorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        school_repo = SchoolRepoFactory.create()

        return SchoolValidator(
            user_repo=user_repo,
            school_repo=school_repo
        )
