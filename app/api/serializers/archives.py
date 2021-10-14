from typing import List

from api.entities.archives import ResultArchive


class ResultArchiveSerializer:
    @staticmethod
    def serialize(result_archive: ResultArchive) -> dict:

        return {
            "id": result_archive.id,
            "student_id": result_archive.student_id,
            "game_id": result_archive.game_id,
            "submit_at": result_archive.submit_at,
            "right_answers": result_archive.right_answers,
            "total_tasks": result_archive.total_tasks,
            "total_points": result_archive.total_points,
            "payload": result_archive.payload
        }

    @staticmethod
    def list_serialize(archives: List[ResultArchive]) -> List[dict]:

        return [ResultArchiveSerializer.serialize(archive) for archive in archives]
