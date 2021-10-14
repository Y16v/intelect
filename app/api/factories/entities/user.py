from api.entities.user import User, UserCategory


class UserEntity:
    @staticmethod
    def create(
            id,
            category_id,
            school_id,
            teacher_id,
            username,
            first_name,
            last_name,
            phone,
            email,
            is_active,
            group_id=None,
            student_password=None,
            start_validity_date=None,
            active_until=None,
            **kwargs
    ):
        return User(
            id=id,
            category_id=category_id,
            school_id=school_id,
            teacher_id=teacher_id,
            group_id=group_id,
            username=username,
            first_name=first_name,
            last_name=last_name,
            phone=phone,
            email=email,
            is_active=is_active,
            student_password=student_password,
            start_validity_date=start_validity_date,
            active_until=active_until
        )


class UserEntityFactory:
    @staticmethod
    def create():
        return UserEntity


class UserCategoryEntity:
    @staticmethod
    def create(id, name, *args, **kwargs):
        return UserCategory(
            id=id,
            name=name
        )


class UserCategoryEntityFactory:
    @staticmethod
    def create():
        return UserCategoryEntity
