from datetime import datetime


class WinnersListInteractor:
    def __init__(self, winner_repo, user_repo, school_repo):
        self.winner_repo = winner_repo
        self.user_repo = user_repo
        self.school_repo = school_repo

        self.logged_user_id = None
        self.year = None
        self.month = None
        self.with_student = None

    def set_params(self, logged_user_id, year: int, month: int, with_student=False):
        self.logged_user_id = logged_user_id
        self.year = year or datetime.today().year
        self.month = month or datetime.today().month
        self.with_student = with_student

        return self

    def execute(self):
        winners = self.winner_repo.filter_by_year_and_month(self.year, self.month)
        if self.with_student:
            for winner in winners:
                student = self.user_repo.get_by_id(winner.student_id)
                school = self.school_repo.get_by_id(student.school_id)
                student.school_name = school.name
                winner.student = student

        return winners
