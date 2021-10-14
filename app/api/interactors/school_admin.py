from api.exceptions.exeptions import NoPermissionException, ValidationException, get_user_unique_field_error
from api.models.constants import UserCategory


class SchoolAdminCreateInteractor:
    def __init__(self, user_repo, user_category_repo, user_entity, user_validator):
        self.user_repo = user_repo
        self.user_category_repo = user_category_repo
        self.user_entity = user_entity
        self.user_validator = user_validator

        self.id = None
        self.logged_user_id = None
        self.first_name = None
        self.last_name = None
        self.username = None
        self.email = None
        self.phone = None
        self.category_id = user_category_repo.get_by_name(UserCategory.SCHOOL_ADMIN).id
        self.teacher_id = None
        self.school_id = None
        self.is_active = True
        self.password = None
        self.student_password = None

    def set_params(
            self,
            logged_user_id,
            first_name,
            last_name,
            username,
            email,
            phone
    ):
        self.password = self.user_repo.create_random_password()
        self.student_password = self.password
        self.logged_user_id = logged_user_id
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.email = email
        self.phone = phone

        return self

    def execute(self):
        self._validate_logged_user()
        self._validate_data()

        user = self.user_entity.create(**self.__dict__)
        user.password = self.password
        user.student_password = self.student_password
        user = self.user_repo.create(user)

        return user

    def _validate_logged_user(self):
        user = self.user_repo.get_by_id(self.logged_user_id)
        user_category = self.user_category_repo.get_by_id(user.category_id)

        if user_category.name != UserCategory.SUPER_ADMIN:
            raise NoPermissionException()

    def _validate_data(self):
        self.user_validator.unique_username_validate(self.username)

        self.user_validator.is_valid_email(self.email)
        self.user_validator.unique_email_validate(self.email)

        self.user_validator.is_valid_phone(self.phone)
        self.user_validator.unique_phone_validate(self.phone)


class SchoolAdminRetrieveInteractor:
    def __init__(self, user_repo, user_category_repo, school_repo, user_entity):
        self.user_repo = user_repo
        self.user_category_repo = user_category_repo
        self.school_repo = school_repo
        self.user_entity = user_entity

        self.logged_user_id = None
        self.school_admin_pk = None

    def set_params(self, logged_user_id, school_admin_pk):
        self.logged_user_id = logged_user_id
        self.school_admin_pk = school_admin_pk

        return self

    def execute(self):
        logged_user = self.user_repo.get_by_id(self.logged_user_id)
        school_admin = self.user_repo.get_by_id(self.school_admin_pk)
        self._validate_logged_user(logged_user, school_admin)

        return school_admin

    def _validate_logged_user(self, logged_user, school_admin):
        user_category = self.user_category_repo.get_by_id(logged_user.category_id)

        school = self.school_repo.get_by_id(school_admin.school_id)

        if user_category.name != UserCategory.SUPER_ADMIN and \
                school.owner_id != logged_user.id:
            raise NoPermissionException()


class SchoolAdminUpdateInteractor:
    def __init__(self, user_repo, user_category_repo, school_repo, user_permission_validator, user_validator):
        self.user_repo = user_repo
        self.user_category_repo = user_category_repo
        self.school_repo = school_repo
        self.user_permission_validator = user_permission_validator
        self.user_validator = user_validator

        self.id = None
        self.logged_user_id = None
        self.school_admin_pk = None
        self.first_name = None
        self.last_name = None
        self.username = None
        self.email = None
        self.phone = None

    def set_params(
            self,
            logged_user_id,
            school_admin_pk,
            first_name,
            last_name,
            username,
            email,
            phone
    ):
        self.school_admin_pk = school_admin_pk
        self.logged_user_id = logged_user_id
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.email = email
        self.phone = phone

        return self

    def execute(self):
        logged_user = self.user_repo.get_by_id(self.logged_user_id)
        school_admin = self.user_repo.get_by_id(self.school_admin_pk)

        self._validate_logged_user(logged_user, school_admin)
        self._validate_data(school_admin)

        return self._update_school_admin(school_admin)

    def _update_school_admin(self, school_admin):
        if self.username:
            school_admin.username = self.username
        if self.email:
            school_admin.email = self.email
        if self.phone:
            school_admin.phone = self.phone
        if self.first_name:
            school_admin.first_name = self.first_name
        if self.last_name:
            school_admin.last_name = self.last_name

        return self.user_repo.update(school_admin)

    def _validate_logged_user(self, logged_user, school_admin):
        user_category = self.user_category_repo.get_by_id(logged_user.category_id)

        school = self.school_repo.get_by_id(school_admin.school_id)
        if user_category.name != UserCategory.SUPER_ADMIN and \
                school.owner_id != logged_user.id:
            raise NoPermissionException()

    def _validate_data(self, school_admin):
        if self.username and school_admin.username != self.username:
            self.user_validator.unique_username_validate(self.username)

        if self.email and school_admin.email != self.email:
            self.user_validator.is_valid_email(self.email)
            self.user_validator.unique_email_validate(self.email)

        if self.phone and school_admin.phone != self.phone:
            self.user_validator.is_valid_phone(self.phone)
            self.user_validator.unique_phone_validate(self.phone)

        return True
