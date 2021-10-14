from api.factories.entities.archives import ResultArchiveEntityFactory
from api.factories.repositories.archives import ResultArchiveRepoFactory
from api.factories.repositories.result import ResultRepoFactory, ResultItemRepoFactory
from api.services.result_archvator import ResultArchiverService


class ResultArchiverServiceFactory:
    @staticmethod
    def create():
        result_archive_repo = ResultArchiveRepoFactory.create()
        result_repo = ResultRepoFactory.create()
        result_item_repo = ResultItemRepoFactory.create()
        result_archive_entity = ResultArchiveEntityFactory.create()

        return ResultArchiverService(
            result_archive_repo=result_archive_repo,
            result_repo=result_repo,
            result_item_repo=result_item_repo,
            result_archive_entity=result_archive_entity
        )
