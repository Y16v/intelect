from django.utils import timezone
from decimal import Decimal

from api.exceptions.exeptions import NoLoggedException, NoPermissionException, ValidationException, \
    InvalidEntityException, RESULTS_SUBMIT_AT_INVALID_DATE_FORMAT
from api.models.constants import UserCategory, AfterburnerValueCoefficients, \
    MultiplyDivisionSquareCubeValueCoefficients, ResultActionTypes
from django.conf import settings
from django.core.exceptions import ValidationError


class BaseResultCreateInteractor:

    def __init__(self, result_repo, result_item_repo, result_entity, result_item_entity):
        self.result_repo = result_repo
        self.result_item_repo = result_item_repo
        self.result_entity = result_entity
        self.result_item_entity = result_item_entity

    def set_params(self, logged_id, game_id, results):
        self.logged_id = logged_id
        self.game_id = game_id
        self.results = results
        return self

    def execute(self):
        if not self.logged_id:
            raise NoLoggedException()
        result = self.result_entity.create(
            id=None,
            game_id=self.game_id,
            student_id=self.logged_id,
            submit_at=None
        )
        result = self.result_repo.create(result)
        for item in self.results:
            result_item = self.result_item_entity.create(
                id=None,
                result_id=result.id,
                points=None,
                **item
            )
            result_item.points = self.calculate_item_points(result_item)
            self.result_item_repo.create(result_item)

        return True

    def calculate_item_points(self, result_item) -> Decimal:
        return Decimal("0")


class AfterburnerResultCreateInteractor(BaseResultCreateInteractor):
    def calculate_item_points(self, result_item) -> float:
        points = 0
        if result_item.action_count >= 5:
            points += result_item.action_count * AfterburnerValueCoefficients.action_count
            points += result_item.count_digits * AfterburnerValueCoefficients.count_digits
            points += result_item.count_digit_minus * AfterburnerValueCoefficients.count_digit_minus
            points += len(result_item.modules.split(',')) * AfterburnerValueCoefficients.modules
            points += len(result_item.modules_minus.split(',')) * AfterburnerValueCoefficients.modules_minus

            if 1 < result_item.speed <= 5:
                max_point, max_value, min_value, points_for_minus_unit = AfterburnerValueCoefficients.speed_gt_one
                points += max_point - (result_item.speed * points_for_minus_unit)
            elif 0.1 < result_item.speed <= 1:
                max_point, max_value, min_value, points_for_minus_unit = AfterburnerValueCoefficients.speed_lt_one
                points += max_point - ((result_item.speed * 10) * points_for_minus_unit)
            else:
                pass

        if result_item.answer and (float(result_item.answer) == float(result_item.exact)):
            total = points * AfterburnerValueCoefficients.right_answer
        else:
            total = points * AfterburnerValueCoefficients.wrong_answer

        return total


class MultiplyDivisionSquareCubeResultCreateInteractor(BaseResultCreateInteractor):
    def calculate_item_points(self, result_item) -> float:
        points = 0
        if result_item.count_digits >= 2:
            points += MultiplyDivisionSquareCubeValueCoefficients.action_type[result_item.action_type]
            points += len(result_item.modules.split(',')) * \
                      MultiplyDivisionSquareCubeValueCoefficients.modules
            points += len(result_item.modules_minus.split(',')) * \
                      MultiplyDivisionSquareCubeValueCoefficients.modules_minus

            if result_item.action_type not in [
                ResultActionTypes.SQUARE,
                ResultActionTypes.CUBE,
                ResultActionTypes.SQRT,
                ResultActionTypes.CBRT
            ]:
                points += result_item.count_digits * \
                          MultiplyDivisionSquareCubeValueCoefficients.count_digits
                points += result_item.count_digit_minus * \
                          MultiplyDivisionSquareCubeValueCoefficients.count_digit_minus

            if 1 < result_item.speed <= 5:
                max_point, \
                max_value, \
                min_value, \
                points_for_minus_unit = MultiplyDivisionSquareCubeValueCoefficients.speed_gt_one
                points += max_point - (result_item.speed * points_for_minus_unit)
            elif 0.1 < result_item.speed <= 1:
                max_point, \
                max_value, \
                min_value, \
                points_for_minus_unit = MultiplyDivisionSquareCubeValueCoefficients.speed_lt_one
                points += max_point - ((result_item.speed * 10) * points_for_minus_unit)
            else:
                pass

        if result_item.answer and (float(result_item.answer) == float(result_item.exact)):
            total = points * MultiplyDivisionSquareCubeValueCoefficients.right_answer
        else:
            total = points * MultiplyDivisionSquareCubeValueCoefficients.wrong_answer

        return total


class GetResultInteractor:
    def __init__(self, result_repo, result_item_repo, result_entity, result_item_entity):
        self.result_repo = result_repo
        self.result_item_repo = result_item_repo
        self.result_entity = result_entity
        self.result_item_entity = result_item_entity

    def set_params(self, logged_user_id, result_id):
        self.logged_id = logged_user_id
        self.result_id = result_id
        return self

    def execute(self):
        if not self.logged_id:
            raise NoLoggedException
        result = self.result_repo.get_by_id(self.result_id)
        result.result_items = self.result_item_repo.get_list_by_result(self.result_id)
        result.total = self.result_item_repo.get_total(self.result_id)
        result.right_total = self.result_item_repo.get_right_total(self.result_id)
        result.total_points = self.result_item_repo.get_result_total_points(result.id)

        return result


class GetResultListInteractor:
    logged_id = None
    student_id = None
    page = None
    start_date = None
    end_date = None

    def __init__(self, user_repo, result_repo, result_item_repo, result_entity):
        self.user_repo = user_repo
        self.result_repo = result_repo
        self.result_entity = result_entity
        self.result_item_repo = result_item_repo

    def set_params(self, logged_user_id, student_id, page, start_date, end_date):
        self.logged_id = logged_user_id
        self.student_id = student_id
        self.page = page
        self.start_date = start_date
        self.end_date = end_date

        return self

    def execute(self):
        self._validate()

        if not self.start_date or not self.end_date:
            self.start_date, self.end_date = self._get_this_week_date_ranges()

        if not self.start_date or not self.end_date:
            return [], {"from": None, "to": None}

        results = self.result_repo.filter_student_results_by_date_range(self.student_id, self.start_date,
                                                                        self.end_date)
        from_date, to = self.result_repo.get_student_results_date_ranges(self.student_id)
        available_date_range = {
            "from": from_date,
            "to": to
        }
        for result in results:
            result.total = self.result_item_repo.get_total(result.id)
            result.right_total = self.result_item_repo.get_right_total(result.id)
            result.total_points = self.result_item_repo.get_result_total_points(result.id)

        return results, available_date_range

    def _validate(self):
        if not self.logged_id:
            raise NoLoggedException

        if self.start_date and self.end_date:
            try:
                self.result_repo.filter_student_results_by_date_range(self.student_id, self.start_date, self.end_date)
            except ValidationError:
                raise InvalidEntityException(RESULTS_SUBMIT_AT_INVALID_DATE_FORMAT)

    def _get_this_week_date_ranges(self):
        _smallest_date, largest_date = self.result_repo.get_student_results_date_ranges(self.student_id)

        if not largest_date:
            return None, None
        day = largest_date.weekday()
        first_day_in_a_week = largest_date - timezone.timedelta(days=day)
        first_day_in_a_week = first_day_in_a_week.replace(hour=0, minute=0, second=0, microsecond=0)

        return first_day_in_a_week, largest_date


class DeleteAllResultsInteractor:
    def __init__(self,
                 user_repo,
                 user_category_repo,
                 result_item_repo,
                 winner_repo,
                 winner_entity,
                 result_archiver
                 ):
        self.user_repo = user_repo
        self.user_category_repo = user_category_repo
        self.result_item_repo = result_item_repo
        self.winner_repo = winner_repo
        self.winner_entity = winner_entity
        self.result_archiver = result_archiver

    def set_params(self, ):
        return self

    def execute(self):
        self._create_winners()
        self.result_archiver.archive_all_results_and_delete()

        return True

    def _create_winners(self):
        top_students = self.user_repo.get_all_students(page=1)
        for student in top_students:
            winner = self.winner_entity.create(
                id=None,
                student_id=student.id,
                points=self.result_item_repo.get_student_total_points(student.id),
                date=None
            )
            self.winner_repo.create(winner)
