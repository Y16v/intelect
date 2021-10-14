from api.exceptions.exeptions import InvalidEntityException, NEW_AND_CONFIRM_PASSWORDS_NOT_MATCH
from api.models.constants import UserCategory


class GetCurrentUserInteractor:
    def __init__(self, user_repo, school_repo, result_item_repo):
        self.user_repo = user_repo
        self.school_repo = school_repo
        self.result_item_repo = result_item_repo

    def set_params(self, logged_user_id, *args, **kwargs):
        self.logged_user_id = logged_user_id
        return self

    def execute(self):
        user = self.user_repo.get_by_id(self.logged_user_id)
        if user.category_id == UserCategory.STUDENT_CATEGORY_ID:
            school = self.school_repo.get_by_id(user.school_id)
            user.school_name = school.name
            user.order = self.user_repo.get_ordering_number(user)
            user.teacher = self.user_repo.get_by_id(user.teacher_id)
        user.rating = self.result_item_repo.get_all_right_total(user.id)
        return user


class UserChangePasswordInteractor:
    def __init__(self, user_repo):
        self.user_repo = user_repo

        self.logged_user_id = None
        self.old_password = None
        self.new_password = None
        self.confirm_password = None

    def set_params(self, logged_user_id, old_password, new_password, confirm_password):
        self.logged_user_id = logged_user_id
        self.old_password = old_password
        self.new_password = new_password
        self.confirm_password = confirm_password

        return self

    def execute(self):
        user = self.user_repo.get_by_id(self.logged_user_id)
        self._validate_data(user)

        return self.user_repo.set_password(user.id, self.new_password)

    def _validate_data(self, user):
        self.user_repo.check_password(user, self.old_password)

        if self.new_password != self.confirm_password:
            raise InvalidEntityException(NEW_AND_CONFIRM_PASSWORDS_NOT_MATCH)


class ChangeChildPasswordInteractor:
    logged_user_id = None
    child_user_id = None
    new_password = None
    confirm_password = None

    def __init__(self, user_repo, user_permission_validator, user_validator):
        self.user_repo = user_repo
        self.user_permission_validator = user_permission_validator
        self.user_validator = user_validator

    def set_params(self, logged_user_id, child_user_id, new_password, confirm_password):
        self.logged_user_id = logged_user_id
        self.child_user_id = child_user_id
        self.new_password = new_password
        self.confirm_password = confirm_password

        return self

    def execute(self):
        self._validate_permission()
        self._validate_data()

        self.user_repo.set_password(self.child_user_id, self.new_password)

        return True

    def _validate_permission(self):
        self.user_permission_validator.is_authenticated(self.logged_user_id)
        self.user_permission_validator.is_active_user(self.logged_user_id)
        self.user_permission_validator.is_not_student(self.logged_user_id)

        logged_user = self.user_repo.get_by_id(self.logged_user_id)

        if logged_user.category_id == UserCategory.SUPER_ADMIN_CATEGORY_ID:
            self.user_permission_validator.is_user_not_super_admin(self.child_user_id)
            return True

        if logged_user.category_id == UserCategory.SCHOOL_ADMIN_CATEGORY_ID:
            self.user_permission_validator.is_academic_user(self.child_user_id)
            self.user_permission_validator.is_school_admin_of_academic_school(self.logged_user_id, self.child_user_id)
            return True

        self.user_permission_validator.is_student_user(self.child_user_id)
        self.user_permission_validator.is_teacher_of_student(self.logged_user_id, self.child_user_id)
        return True

    def _validate_data(self):
        self.user_validator.is_passwords_equal(self.new_password, self.confirm_password)
        self.user_validator.is_password_has_valid_length(self.new_password)


class RetrieveUserInteractor:
    logged_user_id = None
    user_id = None

    def __init__(self, user_repo, result_item_repo, user_permission_validator):
        self.user_repo = user_repo
        self.result_item_repo = result_item_repo
        self.user_permission_validator = user_permission_validator

    def set_params(self, logged_user_id, user_id, *args, **kwargs):
        self.logged_user_id = logged_user_id
        self.user_id = user_id
        return self

    def execute(self):
        self._validate_permission()
        user = self.user_repo.get_by_id(self.user_id)
        if user.category_id == UserCategory.STUDENT_CATEGORY_ID:
            user.rating = self.result_item_repo.get_all_right_total(user.id)
            user.order = self.user_repo.get_ordering_number(user)
        return user

    def _validate_permission(self):
        self.user_permission_validator.is_authenticated(self.logged_user_id)
        self.user_permission_validator.is_active_user(self.logged_user_id)
        self.user_permission_validator.is_not_student(self.logged_user_id)

        logged_user = self.user_repo.get_by_id(self.logged_user_id)

        if logged_user.category_id == UserCategory.SUPER_ADMIN_CATEGORY_ID:
            return True

        if logged_user.category_id == UserCategory.SCHOOL_ADMIN_CATEGORY_ID:
            self.user_permission_validator.is_academic_user(self.user_id)
            self.user_permission_validator.is_school_admin_of_academic_school(self.logged_user_id, self.user_id)
            return True

        self.user_permission_validator.is_student_user(self.user_id)
        self.user_permission_validator.is_teacher_of_student(self.logged_user_id, self.user_id)

        return True
