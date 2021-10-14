from api.services.decorators import threaded
import json
from typing import List

from api.entities.result import Result, ResultItem
from api.factories.entities.archives import ResultArchiveEntity
from api.repositories.result import ResultRepo, ResultItemRepo
from api.repositories.result_archive import ResultArchiveRepo
from api.serializers.result import ResultItemSerializer


class ResultArchiverService:
    def __init__(self,
                 result_archive_repo: ResultArchiveRepo,
                 result_repo: ResultRepo,
                 result_item_repo: ResultItemRepo,
                 result_archive_entity: ResultArchiveEntity,
                 ):
        self.result_repo = result_repo
        self.result_item_repo = result_item_repo
        self.result_archive_repo = result_archive_repo
        self.result_archive_entity = result_archive_entity

    def archive_all_results_and_delete(self):
        all_results: List[Result] = self.result_repo.all()
        for result in all_results:
            self._make_result_archive(result)

        self.result_item_repo.delete_all()
        self.result_repo.delete_all()

    def _make_result_archive(self, result: Result) -> None:
        result_items: List[ResultItem] = self.result_item_repo.get_list_by_result(result.id)
        serialized_data: dict = ResultItemSerializer.list_serialize(result_items)
        payload = json.dumps(serialized_data)
        right_answers = self.result_item_repo.get_right_total(result.id)
        total_tasks = len(result_items)
        total_points = self.result_item_repo.get_result_total_points(result.id)

        result_archive = self.result_archive_entity.create(
            **result.__dict__,
            right_answers=right_answers,
            total_tasks=total_tasks,
            total_points=total_points,
            payload=payload
        )

        self.result_archive_repo.create(result_archive)

