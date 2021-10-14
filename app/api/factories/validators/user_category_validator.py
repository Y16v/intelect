from api.factories.repositories.user_repo import UserCategoryRepoFactory
from api.validators.user_category_validator import UserCategoryValidator


class UserCategoryValidatorFactory:
    @staticmethod
    def create():
        user_category_repo = UserCategoryRepoFactory.create()

        return UserCategoryValidator(
            user_category_repo=user_category_repo
        )
