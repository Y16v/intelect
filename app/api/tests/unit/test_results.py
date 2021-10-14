from decimal import Decimal
from unittest import TestCase

from api.factories.entities.result import ResultItemEntity
from api.interactors.result import AfterburnerResultCreateInteractor


class AfterburnerResultsUnitTests(TestCase):
    def setUp(self) -> None:
        self.params = {
            "digits": "1 + 2 + 4 + 5 + 2",
            "exact": 15,
            "answer": "15",
            "action_count": 5,
            "action_type": "+/-",
            "speed": 0.1,
            "count_digits": 5,
            "count_digit_minus": 2,
            "modules": "1,2,3,4,5,6",
            "modules_minus": "1,1,2,3,4,5"
        }

    def test_should_get_more_points_if_answer_is_correct(self):
        params = {**self.params}

        result_item = ResultItemEntity.create(
            id=None,
            result_id=None,
            points=None,
            **params
        )
        interactor = AfterburnerResultCreateInteractor(
            None, None, None, None
        ).set_params(None, None, None)

        points = interactor.calculate_item_points(result_item)

        self.assertEqual(points, Decimal(4.9))

    def test_should_get_ten_times_less_points_then_if_answer_was_correct(self):
        params_with_incorrect_answer = {
            **self.params,
            'exact': 999,
            'answer': 111
        }
        params_with_correct_answer = {**self.params}

        result_item_with_incorrect_answer = ResultItemEntity.create(
            id=None,
            result_id=None,
            points=None,
            **params_with_incorrect_answer
        )
        result_item_with_correct_answer = ResultItemEntity.create(
            id=None,
            result_id=None,
            points=None,
            **params_with_correct_answer
        )
        interactor = AfterburnerResultCreateInteractor(
            None, None, None, None
        ).set_params(None, None, None)

        points_when_answer_is_incorrect = interactor.calculate_item_points(result_item_with_incorrect_answer)
        points_when_answer_is_correct = interactor.calculate_item_points(result_item_with_correct_answer)

        self.assertEqual(
            points_when_answer_is_incorrect,
            Decimal('1.0') * points_when_answer_is_correct/Decimal('10.00')
        )
