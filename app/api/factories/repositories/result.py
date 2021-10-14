from api.factories.entities.result import ResultEntityFactory, ResultItemEntityFactory
from api.repositories.result import ResultRepo, ResultItemRepo


class ResultRepoFactory:

    @staticmethod
    def create():
        user_repo_entity = ResultEntityFactory.create()
        return ResultRepo(user_repo_entity)


class ResultItemRepoFactory:

    @staticmethod
    def create():
        result_item_repo_entity = ResultItemEntityFactory.create()
        return ResultItemRepo(result_item_repo_entity)
