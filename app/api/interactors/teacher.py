from api.exceptions.exeptions import NoLoggedException, NoPermissionException, SCHOOL_PACKAGE_IS_EMPTY
from api.models.constants import UserCategory


class GetSchoolTeachersInteractor:

    def __init__(self, user_repo, user_category_repo, school_repo):
        self.user_repo = user_repo
        self.user_category_repo = user_category_repo
        self.school_repo = school_repo

    def set_params(self, logged_id, school_id):
        self.logged_id = logged_id
        self.school_id = school_id
        return self

    def execute(self):
        self._validate()
        return self.user_repo.get_teachers_by_school(self.school_id)

    def _validate(self):
        if not self.logged_id:
            raise NoLoggedException
        user = self.user_repo.get_by_id(self.logged_id)
        user_category = self.user_category_repo.get_by_id(user.category_id)

        school = self.school_repo.get_by_id(self.school_id)

        if user_category.name != UserCategory.SUPER_ADMIN and \
                user_category.name != UserCategory.SCHOOL_ADMIN and \
                school.owner_id != user.id:
            raise NoPermissionException()


class SchoolTeacherUpdateInteractor:
    def __init__(self, user_repo, user_permission_validator, user_validator):
        self.user_repo = user_repo
        self.user_permission_validator = user_permission_validator
        self.user_validator = user_validator

        self.logged_user_id = None
        self.school_pk = None
        self.teacher_pk = None
        self.first_name = None
        self.last_name = None
        self.username = None
        self.email = None
        self.phone = None

    def set_params(self,
                   logged_user_id,
                   school_pk,
                   teacher_pk,
                   first_name,
                   last_name,
                   username,
                   email,
                   phone,
                   ):
        self.logged_user_id = logged_user_id
        self.school_pk = school_pk
        self.teacher_pk = teacher_pk
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.email = email
        self.phone = phone

        return self

    def execute(self):
        self._validate_logged_user()
        teacher = self.user_repo.get_by_user_id_and_school_id(self.teacher_pk, self.school_pk)
        self._validate_data(teacher)

        return self._update_teacher(teacher)

    def _update_teacher(self, teacher):
        if self.username:
            teacher.username = self.username
        if self.email:
            teacher.email = self.email
        if self.phone:
            teacher.phone = self.phone
        if self.first_name:
            teacher.first_name = self.first_name
        if self.last_name:
            teacher.last_name = self.last_name

        return self.user_repo.update(teacher)

    def _validate_logged_user(self):
        self.user_permission_validator.is_authenticated(self.logged_user_id)
        self.user_permission_validator.is_active_user(self.logged_user_id)
        self.user_permission_validator.is_school_admin_of_academic_school(self.logged_user_id, self.teacher_pk)

        self.user_permission_validator.is_teacher_user(self.teacher_pk)

    def _validate_data(self, teacher):
        if self.email and teacher.email != self.email:
            self.user_validator.is_valid_email(self.email)
            self.user_validator.unique_email_validate(self.email)

        if self.phone and teacher.phone != self.phone:
            self.user_validator.is_valid_phone(self.phone)
            self.user_validator.unique_phone_validate(self.phone)

        if self.username and teacher.username != self.username:
            self.user_validator.unique_username_validate(self.username)


class SchoolTeacherUpdateAccessInteractor:
    def __init__(self, user_repo, school_repo, user_permission_validator, user_validator, school_validator):
        self.user_repo = user_repo
        self.school_repo = school_repo
        self.user_permission_validator = user_permission_validator
        self.user_validator = user_validator
        self.school_validator = school_validator

        self.logged_user_id = None
        self.school_pk = None
        self.teacher_pk = None

    def set_params(self, logged_user_id, school_pk, teacher_pk):
        self.logged_user_id = logged_user_id
        self.school_pk = school_pk
        self.teacher_pk = teacher_pk

        return self

    def execute(self):
        self._validate_logged_user()
        self._validate_data()

        school = self.school_repo.get_by_id(self.school_pk)
        teacher = self.user_repo.get_by_id(self.teacher_pk)

        teacher.active_until = None
        school.package = school.package - 1

        self.user_repo.update(teacher)
        self.school_repo.update(school)

        return teacher

    def _validate_logged_user(self):
        self.user_permission_validator.is_authenticated(self.logged_user_id)
        self.user_permission_validator.is_active_user(self.logged_user_id)
        self.user_permission_validator.is_school_admin_of_academic_school(self.logged_user_id, self.teacher_pk)

        self.user_permission_validator.is_teacher_user(self.teacher_pk)

    def _validate_data(self):
        self.school_validator.is_school_has_available_packages(self.school_pk)
