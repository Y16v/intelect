from api.serializers.user import UserSerializer
from api.serializers.utils import AttributeUtility


class GroupSerializer:
    @staticmethod
    def serialize(group):
        group = AttributeUtility(group)
        return {
            "id": group.id,
            "name": group.name,
            "teacher_id": group.teacher_id,
            "students": isinstance(group.students, list) and UserSerializer.list_serialize(group.students)
        }
