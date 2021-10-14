from api.exceptions.exeptions import (
    NoPermissionException,
    ValidationException,
)
from api.models.constants import UserCategory, SCHOOL_DEFAULT_PACKAGE_COUNT
from api.exceptions.messages import SCHOOL_OWNER_ID_IS_REQUIRED, USER_IS_NOT_SCHOOL_ADMIN, SCHOOL_NAME_IS_REQUIRED


class SchoolListInteractor:
    logged_user_id = None

    def __init__(self, user_repo, user_category_repo, school_repo):
        self.user_repo = user_repo
        self.user_category_repo = user_category_repo
        self.school_repo = school_repo

        self.logged_user_id = None

    def set_params(self, logged_user_id):
        self.logged_user_id = logged_user_id

        return self

    def execute(self):
        self._validate_logged_user()
        schools = self.school_repo.all()

        return schools

    def _validate_logged_user(self):
        user = self.user_repo.get_by_id(self.logged_user_id)
        user_category = self.user_category_repo.get_by_id(user.category_id)

        if user_category.name != UserCategory.SUPER_ADMIN:
            raise NoPermissionException()


class SearchSchoolsInteractor:
    logged_user_id = None
    q = None
    page = None
    count = None

    def __init__(self, user_repo, user_category_repo, school_repo):
        self.user_repo = user_repo
        self.user_category_repo = user_category_repo
        self.school_repo = school_repo

    def set_params(self, logged_user_id, q, page, count):
        self.logged_user_id = logged_user_id
        self.q = q
        self.page = page
        self.count = count

        return self

    def execute(self):
        self._validate_logged_user()

        if not self.q:
            schools, total = self.school_repo.all_with_pagination(self.page, self.count)
            return schools, total

        schools, total = self.school_repo.search_school_by_name_with_pagination(self.q, self.page, self.count)
        return schools, total

    def _validate_logged_user(self):
        user = self.user_repo.get_by_id(self.logged_user_id)
        user_category = self.user_category_repo.get_by_id(user.category_id)

        if user_category.name != UserCategory.SUPER_ADMIN:
            raise NoPermissionException()


class SchoolCreateInteractor:
    def __init__(self, user_repo, user_category_repo, school_repo, school_entity, school_validator):
        self.user_repo = user_repo
        self.user_category_repo = user_category_repo
        self.school_repo = school_repo
        self.school_entity = school_entity
        self.school_validator = school_validator

        self.id = None
        self.logged_user_id = None
        self.owner_id = None
        self.name = None
        self.created_at = None
        self.is_active = True
        self.package = SCHOOL_DEFAULT_PACKAGE_COUNT

    def set_params(self, logged_user_id, owner_id, name, is_active=True):
        self.logged_user_id = logged_user_id
        self.owner_id = owner_id
        self.name = name
        self.is_active = is_active

        return self

    def execute(self):
        self._validate_logged_user()
        school = self.school_entity.create(**self.__dict__)
        self._validate_school_data(school)

        school = self.school_repo.create(school)
        owner = self.user_repo.get_by_id(school.owner_id)
        self._update_owner_school_id(owner, school)

        return school

    def _validate_logged_user(self):
        user = self.user_repo.get_by_id(self.logged_user_id)
        user_category = self.user_category_repo.get_by_id(user.category_id)

        if user_category.name != UserCategory.SUPER_ADMIN:
            raise NoPermissionException()

    def _validate_school_data(self, school):
        if not school.owner_id:
            raise ValidationException(SCHOOL_OWNER_ID_IS_REQUIRED)

        owner = self.user_repo.get_by_id(school.owner_id)
        school_owner_category = self.user_category_repo.get_by_name(UserCategory.SCHOOL_ADMIN)

        if owner.category_id != school_owner_category.id:
            raise ValidationException(USER_IS_NOT_SCHOOL_ADMIN)

        if not school.name:
            self.user_repo.delete_by_id(self.owner_id)
            raise ValidationException(SCHOOL_NAME_IS_REQUIRED)

        if self.name:
            self.school_validator.unique_school_name_validate(self.name)

    def _update_owner_school_id(self, owner, school):
        owner = self.user_repo.get_by_id(school.owner_id)
        owner.school_id = school.id
        self.user_repo.update(owner)


class RetrieveSchoolInteractor:
    def __init__(self,
                 user_repo,
                 user_category_repo,
                 school_repo,
                 package_type_repo
                 ):
        self.user_repo = user_repo
        self.user_category_repo = user_category_repo
        self.school_repo = school_repo
        self.package_type_repo = package_type_repo

        self.logged_user_id = None
        self.school_pk = None

    def set_params(self, logged_user_id, school_pk):
        self.logged_user_id = logged_user_id
        self.school_pk = school_pk

        return self

    def execute(self):
        self._validate_logged_user()
        school = self.school_repo.get_by_id(self.school_pk)
        if school.package_type_id:
            package_type = self.package_type_repo.get_by_id(school.package_type_id)
            school.package_type = package_type
        return school

    def _validate_logged_user(self):
        user = self.user_repo.get_by_id(self.logged_user_id)
        user_category = self.user_category_repo.get_by_id(user.category_id)

        school = self.school_repo.get_by_id(self.school_pk)

        if user_category.name != UserCategory.SUPER_ADMIN and \
                school.owner_id != user.id:

            raise NoPermissionException()


class UpdateSchoolInteractor:
    def __init__(self, user_repo, user_category_repo, school_repo, school_entity, school_validator):
        self.user_repo = user_repo
        self.user_category_repo = user_category_repo
        self.school_repo = school_repo
        self.school_entity = school_entity
        self.school_validator = school_validator

        self.logged_user_id = None
        self.school_pk = None
        self.name = None
        self.is_active = None

    def set_params(self, logged_user_id, school_pk, name, is_active):
        self.logged_user_id = logged_user_id
        self.school_pk = school_pk
        self.name = name
        self.is_active = is_active

        return self

    def execute(self):
        self._validate_logged_user()
        school = self.school_repo.get_by_id(self.school_pk)
        self._validate_data(school)
        updated_school = self._update_school(school)

        return updated_school

    def _validate_logged_user(self):
        user = self.user_repo.get_by_id(self.logged_user_id)
        user_category = self.user_category_repo.get_by_id(user.category_id)

        school = self.school_repo.get_by_id(self.school_pk)

        if user_category.name != UserCategory.SUPER_ADMIN and \
                school.owner_id != user.id:
            raise NoPermissionException()

    def _validate_data(self, school):
        if self.name and self.name != school.name:
            self.school_validator.unique_school_name_validate(self.name)

    def _update_school(self, school):
        if self.name and self.name != school.name:
            school.name = self.name

        if self.is_active is not None:
            school.is_active = self.is_active

        return self.school_repo.update(school)


class DeleteSchoolInteractor:
    def __init__(self, user_repo, user_category_repo, school_repo):
        self.user_repo = user_repo
        self.user_category_repo = user_category_repo
        self.school_repo = school_repo

        self.logged_user_id = None
        self.school_pk = None

    def set_params(self, logged_user_id, school_pk):
        self.logged_user_id = logged_user_id
        self.school_pk = school_pk

        return self

    def execute(self):
        self._validate_logged_user()

        return self.school_repo.delete_by_id(self.school_pk)

    def _validate_logged_user(self):
        user = self.user_repo.get_by_id(self.logged_user_id)
        user_category = self.user_category_repo.get_by_id(user.category_id)

        if user_category.name != UserCategory.SUPER_ADMIN:
            raise NoPermissionException()


class UpdateSchoolPackageTypeInteractor:
    logged_user_id = None
    school_id = None
    package_type_id = None
    confirm_password = None

    def __init__(self,
                 school_repo,
                 package_type_repo,
                 school_entity,
                 user_permission_validator,
                 school_validator,
                 package_type_validator
                 ):
        self.school_repo = school_repo
        self.package_type_repo = package_type_repo
        self.school_entity = school_entity
        self.user_permission_validator = user_permission_validator
        self.school_validator = school_validator
        self.package_type_validator = package_type_validator

    def set_params(self, logged_user_id, school_id, package_type_id, confirm_password):
        self.logged_user_id = logged_user_id
        self.school_id = school_id
        self.package_type_id = package_type_id
        self.confirm_password = confirm_password

        return self

    def execute(self):
        self._validate()
        school = self._update_school_package_type()

        return school

    def _update_school_package_type(self):
        school = self.school_repo.get_by_id(self.school_id)
        package_type = self.package_type_repo.get_by_id(self.package_type_id)

        school.package_type_id = package_type.id
        school.package = package_type.accounts_quantity

        school = self.school_repo.update(school)

        return school

    def _validate(self):
        self.user_permission_validator.is_authenticated(self.logged_user_id)
        self.user_permission_validator.is_active_user(self.logged_user_id)
        self.user_permission_validator.is_superuser_or_owner_of_school(self.logged_user_id, self.school_id)
        self.user_permission_validator.check_password(self.logged_user_id, self.confirm_password)

        self.school_validator.is_school_has_not_available_packages(self.school_id)
        self.package_type_validator.is_package_type_exists(self.package_type_id)
        self.package_type_validator.is_available_for_not_individual_schools(self.package_type_id)


class UpdateSchoolPackageInteractor:
    logged_user_id = None
    school_id = None
    confirm_password = None

    def __init__(self,
                 school_repo,
                 package_type_repo,
                 school_entity,
                 user_permission_validator,
                 ):

        self.school_repo = school_repo
        self.package_type_repo = package_type_repo
        self.school_entity = school_entity
        self.user_permission_validator = user_permission_validator

    def set_params(self, logged_user_id, school_id, confirm_password):
        self.logged_user_id = logged_user_id
        self.school_id = school_id
        self.confirm_password = confirm_password

        return self

    def execute(self):
        self._validate()
        school = self._add_package()

        return school

    def _add_package(self):
        school = self.school_repo.get_by_id(self.school_id)
        package_type = self.package_type_repo.get_by_id(school.package_type_id)

        school.package_type_id = package_type.id
        school.package += package_type.accounts_quantity

        school = self.school_repo.update(school)

        return school

    def _validate(self):
        self.user_permission_validator.is_authenticated(self.logged_user_id)
        self.user_permission_validator.is_active_user(self.logged_user_id)
        self.user_permission_validator.is_superuser_or_owner_of_school(self.logged_user_id, self.school_id)

        self.user_permission_validator.check_password(self.logged_user_id, self.confirm_password)
