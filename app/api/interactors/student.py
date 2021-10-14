from datetime import datetime

from api.exceptions.exeptions import NoPermissionException, NoLoggedException, EntityDoesNotExistException, \
    ValidationException
from api.models.constants import UserCategory, DATE_FORMAT


class SchoolStudentsListInteractor:
    def __init__(self, user_repo, user_category_repo, school_repo, result_item_repo):
        self.user_repo = user_repo
        self.user_category_repo = user_category_repo
        self.school_repo = school_repo
        self.result_item_repo = result_item_repo

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
        student_category = self.user_category_repo.get_by_name(UserCategory.STUDENT)

        if self.teacher_pk:
            students = self.user_repo.filter(
                school_id=self.school_pk,
                teacher_id=self.teacher_pk,
                category_id=student_category.id
            )
        else:
            students = self.user_repo.filter(school_id=self.school_pk, category_id=student_category.id)
        for student in students:
            student.rating = self.result_item_repo.get_all_right_total(student.id)

        return students

    def _validate_logged_user(self):
        try:
            user = self.user_repo.get_by_id(self.logged_user_id)
        except EntityDoesNotExistException:
            raise NoLoggedException()

        user_category = self.user_category_repo.get_by_id(user.category_id)

        school = self.school_repo.get_by_id(self.school_pk)

        if user_category.name != UserCategory.SUPER_ADMIN and \
                school.owner_id != user.id and \
                user.school_id != school.id:
            raise NoPermissionException()


class CreateStudentInteractor:

    def __init__(self,
                 user_entity,
                 user_repo,
                 user_category_repo,
                 school_repo,
                 user_permission_validator,
                 user_validator,
                 user_category_validator,
                 school_validator
                 ):
        self.user_entity = user_entity
        self.user_repo = user_repo
        self.user_category_repo = user_category_repo
        self.school_repo = school_repo
        self.user_validator = user_validator
        self.user_permission_validator = user_permission_validator
        self.user_category_validator = user_category_validator
        self.school_validator = school_validator

    def set_params(self, logged_id, school_id, teacher_id, group_id, category, student_data):
        self.logged_id = logged_id
        self.school_id = school_id
        self.teacher_id = teacher_id
        self.group_id = group_id
        self.student_data = student_data
        self.category = category

        return self

    def execute(self):
        self._validate_logged_user()
        self._validate_data()
        category = self.user_category_repo.get_by_name(self.category)
        student = self.user_entity.create(
            id=None,
            category_id=category.id,
            teacher_id=self.teacher_id,
            school_id=self.school_id,
            group_id=self.group_id if category.id == UserCategory.STUDENT_CATEGORY_ID else None,
            is_active=True,
            **self.student_data
        )
        password = self.user_repo.create_random_password()
        student.password = password
        student.student_password = password
        school = self.school_repo.get_by_id(self.school_id)
        school.package -= 1
        self.school_repo.update(school)
        return self.user_repo.create(student)

    def _validate_logged_user(self):
        self.user_permission_validator.is_authenticated(self.logged_id)
        self.user_permission_validator.is_active_user(self.logged_id)
        self.user_permission_validator.is_superuser_or_owner_of_school(self.logged_id, self.school_id)

        self.school_validator.is_school_has_available_packages(self.school_id)

    def _validate_data(self):
        username = self.student_data.get('username', None)
        email = self.student_data.get('email', None)
        phone = self.student_data.get('phone', None)

        self.user_validator.is_valid_academics_category_name(self.category)

        if self.category == UserCategory.STUDENT:
            self.user_validator.is_dict_includes_all_required_fields_for_create_student(self.student_data)
            self.user_validator.is_field_not_none('teacher_id', self.teacher_id)
            self.user_permission_validator.is_active_user(self.teacher_id)
            self.user_validator.is_teacher_user(self.teacher_id)

            if self.group_id:
                self.user_validator.is_group_teacher_ids_match(self.group_id, self.teacher_id)

        else:
            self.user_validator.is_dict_includes_all_required_fields_for_create_teacher(self.student_data)

        self.user_validator.unique_username_validate(username)

        if self.category == UserCategory.TEACHER or email:
            self.user_validator.is_valid_email(email)
            self.user_validator.unique_email_validate(email)

        if self.category == UserCategory.TEACHER or phone:
            self.user_validator.is_valid_phone(phone)
            self.user_validator.unique_phone_validate(phone)


class DeleteStudentInteractor:
    def __init__(self, 
                 user_repo, user_category_repo, 
                 school_repo, user_permission_validator, 
                 result_repo,
                 result_item_repo):
        self.user_repo = user_repo
        self.user_category_repo = user_category_repo
        self.school_repo = school_repo
        self.user_permission_validator = user_permission_validator
        self.result_repo = result_repo
        self.result_item_repo = result_item_repo

    def set_params(self, logged_user_id, school_pk, student_pk):
        self.logged_user_id = logged_user_id
        self.school_pk = school_pk
        self.student_pk = student_pk
        return self

    def execute(self):
        logged_user = self.user_repo.get_by_id(self.logged_user_id)
        student = self.user_repo.get_by_id(self.student_pk)
        self._validate(logged_user, student)
        self.result_item_repo.delete_by_student_id(student.id)
        self.result_repo.delete_by_student_id(student.id)
        self.user_repo.delete(student.id)
        return student.id

    def _validate(self, logged_user, student):
        self.user_permission_validator.is_authenticated(self.logged_user_id)
        self.user_permission_validator.is_active_user(self.logged_user_id)
        self.user_permission_validator.is_school_admin_user(self.logged_user_id)
        self.user_permission_validator.is_active_school(self.school_pk)
        self.user_permission_validator.is_owner_of_school(self.logged_user_id, self.school_pk)
        if student.school_id != logged_user.school_id:
            raise NoLoggedException()


class SchoolStudentRetrieveInteractor:
    def __init__(self, user_repo, user_category_repo, school_repo):
        self.user_repo = user_repo
        self.user_category_repo = user_category_repo
        self.school_repo = school_repo

        self.logged_user_id = None
        self.school_pk = None
        self.student_pk = None

    def set_params(self, logged_user_id, school_pk, student_pk):
        self.logged_user_id = logged_user_id
        self.school_pk = school_pk
        self.student_pk = student_pk

        return self

    def execute(self):
        student_category = self.user_category_repo.get_by_name(UserCategory.STUDENT)
        student = self.user_repo.get_by_id(id=self.student_pk)
        self._validate_logged_user(student)

        return student

    def _validate_logged_user(self, student):
        user = self.user_repo.get_by_id(self.logged_user_id)
        user_category = self.user_category_repo.get_by_id(user.category_id)

        school = self.school_repo.get_by_id(self.school_pk)

        if user_category.name != UserCategory.SUPER_ADMIN and \
                school.owner_id != user.id and \
                student.teacher_id != user.id and \
                user.id != student.id:
            raise NoPermissionException()


class SchoolStudentUpdateInteractor:
    def __init__(self, user_repo, user_permission_validator, user_validator):
        self.user_repo = user_repo
        self.user_permission_validator = user_permission_validator
        self.user_validator = user_validator

        self.logged_user_id = None
        self.school_pk = None
        self.student_pk = None
        self.teacher_id = None
        self.group_id = None
        self.first_name = None
        self.last_name = None
        self.username = None
        self.email = None
        self.phone = None

    def set_params(self,
                   logged_user_id,
                   school_pk,
                   student_pk,
                   teacher_id,
                   group_id,
                   first_name,
                   last_name,
                   username,
                   email,
                   phone
                   ):

        self.logged_user_id = logged_user_id
        self.school_pk = school_pk
        self.student_pk = student_pk

        self.teacher_id = teacher_id
        self.group_id = group_id
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.email = email
        self.phone = phone

        return self

    def execute(self):
        self._validate_user_permission()
        student = self.user_repo.get_by_user_id_and_school_id(self.student_pk, self.school_pk)
        self._validate_data(student)

        return self._update_student(student)

    def _update_student(self, student):
        student.group_id = self.group_id

        if self.teacher_id:
            student.teacher_id = self.teacher_id
        if self.username:
            student.username = self.username
        if self.email:
            student.email = self.email
        if self.phone:
            student.phone = self.phone
        if self.first_name:
            student.first_name = self.first_name
        if self.last_name:
            student.last_name = self.last_name

        return self.user_repo.update(student)

    def _validate_data(self, student):
        self.user_validator.is_school_ids_match(self.school_pk, self.student_pk)

        if self.teacher_id and student.teacher_id != self.teacher_id:
            self.user_permission_validator.is_active_user(self.teacher_id)
            self.user_validator.is_teacher_user(self.teacher_id)

        if self.group_id and student.group_id != self.group_id:
            self.user_validator.is_group_teacher_ids_match(self.group_id, self.teacher_id)

        if self.email and student.email != self.email:
            self.user_validator.is_valid_email(self.email)
            self.user_validator.unique_email_validate(self.email)

        if self.phone and student.phone != self.phone:
            self.user_validator.is_valid_phone(self.phone)
            self.user_validator.unique_phone_validate(self.phone)

        if self.username and student.username != self.username:
            self.user_validator.unique_username_validate(self.username)

    def _validate_user_permission(self):
        self.user_permission_validator.is_authenticated(self.logged_user_id)
        self.user_permission_validator.is_active_user(self.logged_user_id)

        logged_user = self.user_repo.get_by_id(self.logged_user_id)

        if logged_user.category_id == UserCategory.SUPER_ADMIN_CATEGORY_ID:
            return True

        self.user_permission_validator.is_owner_of_school_or_teacher(self.logged_user_id, self.school_pk)

        if logged_user.category_id == UserCategory.TEACHER_CATEGORY_ID:
            self.user_permission_validator.is_teacher_of_student(self.logged_user_id, self.student_pk)


class SchoolStudentUpdateAccessInteractor:
    def __init__(self, user_repo, school_repo, user_permission_validator, user_validator, school_validator):
        self.user_repo = user_repo
        self.school_repo = school_repo
        self.user_permission_validator = user_permission_validator
        self.user_validator = user_validator
        self.school_validator = school_validator

        self.logged_user_id = None
        self.school_pk = None
        self.student_pk = None

    def set_params(self, logged_user_id, school_pk, student_pk):
        self.logged_user_id = logged_user_id
        self.school_pk = school_pk
        self.student_pk = student_pk

        return self

    def execute(self):
        self._validate_logged_user()
        self._validate_data()

        school = self.school_repo.get_by_id(self.school_pk)
        student = self.user_repo.get_by_id(self.student_pk)

        student.active_until = None
        school.package = school.package - 1

        self.user_repo.update(student)
        self.school_repo.update(school)

        return student

    def _validate_logged_user(self):
        self.user_permission_validator.is_authenticated(self.logged_user_id)
        self.user_permission_validator.is_active_user(self.logged_user_id)
        self.user_permission_validator.is_school_admin_of_academic_school(self.logged_user_id, self.student_pk)

        self.user_permission_validator.is_student_user(self.student_pk)

    def _validate_data(self):
        self.school_validator.is_school_has_available_packages(self.school_pk)


class GetPasswordStudentInteractor:

    def __init__(self, user_repo, user_permission_validator):
        self.user_repo = user_repo
        self.user_permission_validator = user_permission_validator

    def set_params(self, logged_id, student_id):
        self.logged_id = logged_id
        self.student_id = student_id
        return self

    def execute(self):
        student = self.user_repo.get_by_id(self.student_id)
        return {
            'id': student.id,
            'student_password': student.student_password,
            'login': student.username
        }

    def _validate(self):
        logged_user = self.user_repo.get_by_id(self.logged_id)

        if logged_user.category_id == UserCategory.SUPER_ADMIN_CATEGORY_ID:
            return True
        self.user_permission_validator.is_school_admin_of_academic_school(self.logged_id, self.student_id)


class GetRatingStudentsInteractor:

    def __init__(self, user_repo, school_repo, result_item_repo):
        self.user_repo = user_repo
        self.school_repo = school_repo
        self.result_item_repo = result_item_repo

    def set_params(self, logged_id, page):
        self.logged_id = logged_id
        self.page = page
        return self

    def execute(self):
        if not self.logged_id and self.page.isdigit() and int(self.page) > 1:
            raise NoLoggedException
        students = self.user_repo.get_all_students(page=self.page)
        for student in students:
            school = self.school_repo.get_by_id(student.school_id)
            student.school_name = school.name
            student.rating = self.result_item_repo.get_all_right_total(student.id)
            student.order = self.user_repo.get_ordering_number(student)
        return students


class SearchStudentsInteractor:
    q = None
    school_id = None
    teacher_id = None
    group_id = None
    played_at = None
    page = None
    count = None

    def __init__(self, user_repo, result_item_repo, school_repo):
        self.user_repo = user_repo
        self.result_item_repo = result_item_repo
        self.school_repo = school_repo

    def set_params(self, q, school_id, teacher_id, group_id, played_at, page, count):
        self.q = q
        self.school_id = school_id
        self.teacher_id = teacher_id
        self.group_id = group_id
        self.played_at = played_at
        self.page = page
        self.count = count

        return self

    def execute(self):
        self.validate_data()
        students, total = self.user_repo.search_students_by_first_name_and_last_name_including_filters_and_pagination(
            q=self.q,
            school_id=self.school_id,
            teacher_id=self.teacher_id,
            group_id=self.group_id,
            played_at=self.played_at,
            page=self.page,
            count=self.count
        )

        for student in students:
            student.order = self.user_repo.get_ordering_number(student)
            student.rating = self.result_item_repo.get_all_right_total(student.id)
            student.school_name = self.school_repo.get_by_id(student.school_id).name
            student.teacher = self.user_repo.get_by_id(student.teacher_id)

        return students, total

    def validate_data(self):
        if self.played_at:
            try:
                datetime.strptime(self.played_at, DATE_FORMAT)
            except Exception:
                raise ValidationException("played_at.incorrectDateFormat")
