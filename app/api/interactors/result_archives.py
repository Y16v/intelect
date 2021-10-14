from typing import List

from api.repositories.result_archive import ResultArchiveRepo
from api.validators.user_permission_validator import UserPermissionValidator
from django.utils import timezone


class StudentResultArchiveListInteractor:
    logged_user_id = None
    student_id = None
    page = None
    count = None
    provide_all = None
    start_date = None
    end_date = None

    def __init__(self,
                 result_archive_repo: ResultArchiveRepo,
                 user_permission_validator: UserPermissionValidator):

        self.result_archive_repo = result_archive_repo
        self.user_permission_validator = user_permission_validator

    def set_params(self, logged_user_id, student_id, start_date, end_date):
        self.logged_user_id = logged_user_id
        self.student_id = student_id
        self.start_date = start_date
        self.end_date = end_date

        return self

    def execute(self) -> (List[dict], dict):
        self._validate_permissions()

        if not self.start_date or not self.end_date:
            start_date, end_date = self._get_last_played_week_date_range()
            self.start_date = start_date
            self.end_date = end_date

        if not self.start_date or not self.end_date:
            return [], {"from": None, "to": None}

        archives = self.result_archive_repo.filter_student_archives_by_date_range(
            self.student_id, self.start_date, self.end_date)

        from_date, to = self.result_archive_repo.get_student_archives_available_date_range(self.student_id)
        available_date_range = {
            'from': from_date,
            'to': to
        }
        return archives, available_date_range

    def _get_last_played_week_date_range(self):
        _smallest_date, largest_date = self.result_archive_repo.get_student_archives_available_date_range(self.student_id)

        if not largest_date:
            return None, None
        day = largest_date.weekday()
        first_day_in_a_week = largest_date - timezone.timedelta(days=day)
        first_day_in_a_week = first_day_in_a_week.replace(hour=0, minute=0, second=0, microsecond=0)

        return first_day_in_a_week, largest_date

    def _validate_permissions(self):
        if self.logged_user_id == self.student_id:
            return True

        if self.user_permission_validator.is_teacher_of_student(
                self.logged_user_id,
                self.student_id,
                raise_exceptions=False):
            return True

        if self.user_permission_validator.is_school_admin_of_academic_school(
                self.logged_user_id,
                self.student_id,
                raise_exception=False):
            return True

        self.user_permission_validator.is_superuser(self.logged_user_id)
