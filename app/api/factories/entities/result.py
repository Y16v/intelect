from api.entities.result import Result, ResultItem


class ResultEntity:
    @staticmethod
    def create(id, game_id, student_id, submit_at, *args, **kwargs):
        return Result(
            id=id,
            game_id=game_id,
            student_id=student_id,
            submit_at=submit_at
        )


class ResultEntityFactory:
    @staticmethod
    def create():
        return ResultEntity


class ResultItemEntity:
    @staticmethod
    def create(id, result_id,
               points,
               answer,
               exact,
               digits,
               action_count,
               action_type,
               speed,
               count_digits,
               count_digit_minus,
               modules=None,
               modules_minus=None,
               *args, **kwargs):

        return ResultItem(
            id=id,
            result_id=result_id,
            points=points,
            exact=exact,
            answer=answer,
            digits=digits,
            action_count=action_count,
            action_type=action_type,
            speed=speed,
            count_digits=count_digits,
            count_digit_minus=count_digit_minus,
            modules=modules,
            modules_minus=modules_minus
        )


class ResultItemEntityFactory:
    @staticmethod
    def create():
        return ResultItemEntity
