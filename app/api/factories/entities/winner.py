from api.entities.winner import Winner


class WinnerEntity:
    @staticmethod
    def create(
            id,
            student_id,
            points,
            date,
            *args,
            **kwargs
    ):
        return Winner(
            id=id,
            student_id=student_id,
            points=points,
            date=date
        )


class WinnerEntityFactory:
    @staticmethod
    def create():
        return WinnerEntity
