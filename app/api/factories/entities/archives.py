from api.entities.archives import ResultArchive


class ResultArchiveEntity:
    @staticmethod
    def create(
            id: int,
            game_id: int,
            student_id: int,
            submit_at: str,
            right_answers: int,
            total_tasks: int,
            total_points: float,
            payload: str,
            *args,
            **kwargs
    ):
        return ResultArchive(
            id=id,
            game_id=game_id,
            student_id=student_id,
            submit_at=submit_at,
            right_answers=right_answers,
            total_tasks=total_tasks,
            total_points=total_points,
            payload=payload
        )


class ResultArchiveEntityFactory:
    @staticmethod
    def create():
        return ResultArchiveEntity
