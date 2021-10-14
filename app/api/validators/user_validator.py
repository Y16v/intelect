import re

from api.exceptions.exeptions import NoPermissionException, EntityDoesNotExistException, \
    ValidationException
from api.exceptions.messages import (
    get_user_unique_field_error,
    PASSWORD_DON_NOT_MATCH
)
from api.models.constants import UserCategory, USER_PASSWORD_MIN_LENGTH


class UserValidator:
    USERNAME_IS_REQUIRED = 'user.username.isRequired'
    EMAIL_IS_REQUIRED = 'user.email.isRequired'
    PHONE_IS_REQUIRED = 'user.phone.isRequired'
    SELECTED_USER_IS_NOT_TEACHER = 'user.category.isNotTeacher'
    INVALID_PASSWORD_LENGTH = f'user.password.minPasswordLengthIs{USER_PASSWORD_MIN_LENGTH}'
    SCHOOL_IDS_NOT_MATCH = 'user.school.notMatch'
    GROUP_TEACHER_IDS_NOT_MATCH = 'user.group.teacherIdsNotMatch'
    EMAIL_VALIDATION_REGEX = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
    PHONE_VALIDATION_REGEX = r"([(+]*[0-9]+[()+. -]*)"
    EMAIL_IS_NOT_VALID = "user.email.IsNotValidEmail"
    PHONE_IS_NOT_VALID = "user.phone.IsNotValidPhoneNumber"

    def get_required_field_error_message(self, field_name):
        return f'user.{field_name}.isRequired'

    def __init__(self, user_repo, user_category_repo, group_repo):
        self.user_repo = user_repo
        self.user_category_repo = user_category_repo
        self.group_repo = group_repo
        self.teacher_category = self.user_category_repo.get_by_name(UserCategory.TEACHER)
        self.student_category = self.user_category_repo.get_by_name(UserCategory.STUDENT)
        self.super_admin_category = self.user_category_repo.get_by_name(UserCategory.SUPER_ADMIN)
        self.school_admin_category = self.user_category_repo.get_by_name(UserCategory.SCHOOL_ADMIN)

    def is_user_school_admin(self, user_id):
        user = self.user_repo.get_by_id(user_id)

        if user.category_id != self.school_admin_category.id:
            raise NoPermissionException()

        return True

    def is_field_not_none(self, field_name, value):
        if not value:
            raise ValidationException(self.get_required_field_error_message(field_name))

        return True

    def is_teacher_user(self, user_id):
        user = self.user_repo.get_by_id(user_id)

        if not user.category_id == UserCategory.TEACHER_CATEGORY_ID:
            raise ValidationException(self.SELECTED_USER_IS_NOT_TEACHER)

        return True

    def is_valid_email(self, email):
        if not re.match(self.EMAIL_VALIDATION_REGEX, email):
            raise ValidationException(self.EMAIL_IS_NOT_VALID)

        return True

    def is_valid_phone(self, phone):
        if not re.match(self.PHONE_VALIDATION_REGEX, phone):
            raise ValidationException(self.PHONE_IS_NOT_VALID)

        return True

    def unique_email_validate(self, email):
        try:
            self.user_repo.get_by_email(email)
            raise ValidationException(get_user_unique_field_error('email'))
        except EntityDoesNotExistException:
            return True

    def unique_username_validate(self, username):
        try:
            self.user_repo.get_by_username(username)
            raise ValidationException(get_user_unique_field_error('username'))
        except EntityDoesNotExistException:
            return True

    def unique_phone_validate(self, phone):
        try:
            self.user_repo.get_by_phone(phone)
            raise ValidationException(get_user_unique_field_error('phone'))
        except EntityDoesNotExistException:
            return True

    def is_dict_includes_all_required_fields_for_create_student(self, user_dict: dict):
        username = user_dict.get('username', None)

        if not username:
            raise ValidationException(self.USERNAME_IS_REQUIRED)

        return True

    def is_dict_includes_all_required_fields_for_create_teacher(self, user_dict: dict):
        username = user_dict.get('username', None)
        email = user_dict.get('email', None)
        phone = user_dict.get('phone', None)

        if not username:
            raise ValidationException(self.USERNAME_IS_REQUIRED)

        if not email:
            raise ValidationException(self.EMAIL_IS_REQUIRED)

        if not phone:
            raise ValidationException(self.PHONE_IS_REQUIRED)

        return True

    def is_passwords_equal(self, password, confirm_password):
        if password != confirm_password:
            raise ValidationException(PASSWORD_DON_NOT_MATCH)

        return True

    def is_password_has_valid_length(self, password):
        if len(password) < USER_PASSWORD_MIN_LENGTH:
            raise ValidationException(self.INVALID_PASSWORD_LENGTH)

        return True

    def is_school_ids_match(self, school_id, user_id):
        user = self.user_repo.get_by_id(user_id)

        if user.school_id != school_id:
            raise ValidationException(self.SCHOOL_IDS_NOT_MATCH)

        return True

    def is_group_teacher_ids_match(self, group_id, user_id):
        group = self.group_repo.get_by_id(group_id)

        if group.teacher_id != user_id:
            raise ValidationException(self.GROUP_TEACHER_IDS_NOT_MATCH)

        return True

    def is_valid_academics_category_name(self, category_name):
        if category_name not in [UserCategory.TEACHER, UserCategory.STUDENT]:
            raise ValidationException()

        return True
