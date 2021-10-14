from api.serializers.utils import AttributeUtility, DATE_TIME_FORMAT


class ResultSerializer:
    @staticmethod
    def serialize(result):
        result = AttributeUtility(result)
        return {
            'id': result.id,
            'game_id': result.game_id,
            'student_id': result.student_id,
            'result_items': ResultItemSerializer.list_serialize(result.result_items),
            'submit_at': result.submit_at.strftime(DATE_TIME_FORMAT),
            'total': result.total,
            'right_total': result.right_total,
            'total_points': result.total_points
        }

    @staticmethod
    def list_serialize(results):
        return [ResultSerializer.serialize(result) for result in results]


class ResultItemSerializer:

    @staticmethod
    def serialize(result_item):
        result_item = AttributeUtility(result_item)
        return {
            'id': result_item.id,
            'result_id': result_item.result_id,
            'points': float(result_item.points),
            'answer': result_item.answer,
            'exact': result_item.exact,
            'digits': result_item.digits,
            'action_count': result_item.action_count,
            'action_type': result_item.action_type,
            'speed': result_item.speed,
            'count_digits': result_item.count_digits,
            'count_digit_minus': result_item.count_digit_minus,
            'modules': result_item.modules,
            'modules_minus': result_item.modules_minus,
        }

    @staticmethod
    def list_serialize(result_items):
        return [ResultItemSerializer.serialize(result_item) for result_item in result_items or []]