from decimal import Decimal


class Result:
    def __init__(self, id: int, game_id: int, student_id: int, submit_at: str):
        self.id = id
        self.game_id = game_id
        self.student_id = student_id
        self.submit_at = submit_at


class ResultItem:
    def __init__(self, id: int, result_id: int, points: Decimal, answer: float, exact: float, digits: str,
                 action_count: int,
                 action_type: str,
                 speed: float,
                 count_digits: int,
                 count_digit_minus: int,
                 modules: str,
                 modules_minus: str
                 ):
        self.id = id
        self.result_id = result_id
        self.points = points
        self.answer = answer
        self.exact = exact
        self.digits = digits
        self.action_count = action_count
        self.action_type = action_type
        self.speed = speed
        self.count_digits = count_digits
        self.count_digit_minus = count_digit_minus
        self.modules = modules
        self.modules_minus = modules_minus
