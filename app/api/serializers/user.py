from api.serializers.utils import AttributeUtility, DATE_TIME_FORMAT


class UserSerializer:
    @staticmethod
    def serialize(user):
        user = AttributeUtility(user)
        return {
            "id": user.id,
            "category_id": user.category_id,
            "school_id": user.school_id,
            "teacher_id": user.teacher_id,
            "group_id": user.group_id,
            "school_name": user.school_name,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "phone": user.phone,
            "is_active": user.is_active,
            "email": user.email,
            "rating": user.rating,
            "start_validity_date": user.start_validity_date and user.start_validity_date.strftime(DATE_TIME_FORMAT),
            "active_until": user.active_until,
            'order': user.order,
            'teacher': user.teacher and UserSerializer.serialize(user.teacher)
        }

    @staticmethod
    def list_serialize(users):
        return [UserSerializer.serialize(user) for user in users]
