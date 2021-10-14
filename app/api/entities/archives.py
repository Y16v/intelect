

class ResultArchive:
    def __init__(self,
                 id: int,
                 game_id: int,
                 student_id: int,
                 submit_at: str,
                 right_answers: int,
                 total_tasks: int,
                 total_points: float,
                 payload: str
                 ) -> None:
        self.id = id
        self.game_id = game_id
        self.student_id = student_id
        self.submit_at = submit_at
        self.right_answers = right_answers
        self.total_tasks = total_tasks
        self.total_points = total_points
        self.payload = payload
