from api.factories.entities.user import UserEntityFactory, UserCategoryEntityFactory
from api.factories.repositories.result import ResultRepoFactory
from api.repositories.user_repo import UserRepo
from api.repositories.user_category_repo import UserCategoryRepo


class UserCategoryRepoFactory:
    @staticmethod
    def create():
        user_category_entity = UserCategoryEntityFactory.create()
        return UserCategoryRepo(
            user_category_entity=user_category_entity
        )


class UserRepoFactory:
    @staticmethod
    def create():
        user_entity = UserEntityFactory.create()
        result_repo = ResultRepoFactory.create()
        return UserRepo(
            user_entity=user_entity,
            result_repo=result_repo
        )
