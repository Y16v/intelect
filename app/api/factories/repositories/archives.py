from api.factories.entities.archives import ResultArchiveEntityFactory
from api.repositories.result_archive import ResultArchiveRepo


class ResultArchiveRepoFactory:
    @staticmethod
    def create():
        result_archive_entity = ResultArchiveEntityFactory.create()

        return ResultArchiveRepo(
            result_archive_entity=result_archive_entity
        )
