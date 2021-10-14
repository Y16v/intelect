from api.factories.repositories.group import GroupRepoFactory
from api.factories.repositories.user_repo import UserRepoFactory, UserCategoryRepoFactory
from api.validators.user_validator import UserValidator


class UserValidatorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        user_category_repo = UserCategoryRepoFactory.create()
        group_repo = GroupRepoFactory.create()

        return UserValidator(
            user_repo=user_repo,
            user_category_repo=user_category_repo,
            group_repo=group_repo
        )
