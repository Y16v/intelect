from api.factories.entities.result import ResultEntityFactory, ResultItemEntityFactory
from api.factories.entities.winner import WinnerEntityFactory
from api.factories.repositories.result import ResultRepoFactory, ResultItemRepoFactory
from api.factories.repositories.user_repo import UserRepoFactory, UserCategoryRepoFactory
from api.factories.repositories.winner import WinnerRepoFactory
from api.factories.services.result_archiver import ResultArchiverServiceFactory
from api.interactors.result import GetResultInteractor, GetResultListInteractor, \
    DeleteAllResultsInteractor, AfterburnerResultCreateInteractor, MultiplyDivisionSquareCubeResultCreateInteractor


class AfterburnerResultCreateInteractorFactory:

    @staticmethod
    def create():
        result_repo = ResultRepoFactory.create()
        result_item_repo = ResultItemRepoFactory.create()
        result_item_entity = ResultItemEntityFactory.create()
        result_entity = ResultEntityFactory.create()

        return AfterburnerResultCreateInteractor(
            result_repo=result_repo,
            result_item_repo=result_item_repo,
            result_entity=result_entity,
            result_item_entity=result_item_entity
        )


class MultiplyDivisionSquareCubeResultCreateInteractorFactory:

    @staticmethod
    def create():
        result_repo = ResultRepoFactory.create()
        result_item_repo = ResultItemRepoFactory.create()
        result_item_entity = ResultItemEntityFactory.create()
        result_entity = ResultEntityFactory.create()

        return MultiplyDivisionSquareCubeResultCreateInteractor(
            result_repo=result_repo,
            result_item_repo=result_item_repo,
            result_entity=result_entity,
            result_item_entity=result_item_entity
        )


class GetResultInteractorFactory:
    @staticmethod
    def create():
        result_repo = ResultRepoFactory.create()
        result_item_repo = ResultItemRepoFactory.create()
        result_item_entity = ResultItemEntityFactory.create()
        result_entity = ResultEntityFactory.create()
        return GetResultInteractor(
            result_repo=result_repo,
            result_item_repo=result_item_repo,
            result_entity=result_entity,
            result_item_entity=result_item_entity
        )


class GetResultListFactory:
    @staticmethod
    def create():
        result_repo = ResultRepoFactory.create()
        result_entity = ResultEntityFactory.create()
        user_repo = UserRepoFactory.create()
        result_item_repo = ResultItemRepoFactory.create()
        return GetResultListInteractor(
            user_repo=user_repo,
            result_repo=result_repo,
            result_item_repo=result_item_repo,
            result_entity=result_entity
        )


class DeleteAllResultsInteractorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        user_category_repo = UserCategoryRepoFactory.create()
        result_item_repo = ResultItemRepoFactory.create()
        winner_repo = WinnerRepoFactory.create()
        winner_entity = WinnerEntityFactory.create()
        result_archiver = ResultArchiverServiceFactory.create()

        return DeleteAllResultsInteractor(
            user_repo=user_repo,
            user_category_repo=user_category_repo,
            result_item_repo=result_item_repo,
            winner_repo=winner_repo,
            winner_entity=winner_entity,
            result_archiver=result_archiver
        )
