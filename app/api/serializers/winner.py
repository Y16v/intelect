from api.serializers.user import UserSerializer
from api.serializers.utils import AttributeUtility


class WinnerSerializer:
    @staticmethod
    def serialize(winner):
        winner = AttributeUtility(winner)
        return {
            "id": winner.id,
            "student_id": winner.student_id,
            "points": winner.points,
            "date": winner.date,
            "student": winner.student and UserSerializer.serialize(winner.student)
        }

    @staticmethod
    def serialize_list(winners):
        data = []
        for winner in winners:
            data.append(
                WinnerSerializer.serialize(winner)
            )
        return data
