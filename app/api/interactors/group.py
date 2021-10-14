from api.models.constants import UserCategory


class GroupListInteractor:
    logged_user_id = None
    school_id = None
    teacher_id = None

    def __init__(self, group_repo, user_repo, user_permission_validator):
        self.group_repo = group_repo
        self.user_repo = user_repo
        self.user_permission_validator = user_permission_validator

    def set_params(self, logged_user_id, school_id, teacher_id):
        self.logged_user_id = logged_user_id
        self.school_id = school_id
        self.teacher_id = teacher_id

        return self

    def execute(self):
        self._validate()

        if self.teacher_id:
            groups = self.group_repo.filter_by_school_id_and_teacher_id(self.school_id, self.teacher_id)
        else:
            groups = self.group_repo.filter_by_school_id(self.school_id)
            
        for group in groups:
            group.students = self.user_repo.filter_students_by_group(group.id)

        return groups

    def _validate(self):
        self.user_permission_validator.is_authenticated(self.logged_user_id)
        self.user_permission_validator.is_active_user(self.logged_user_id)
        self.user_permission_validator.is_not_student(self.logged_user_id)


class SchoolGroupCreateInteractor:
    logged_user_id = None
    school_id = None
    teacher_id = None
    name = None

    def __init__(self, group_repo, user_repo, group_entity, user_permission_validator, user_validator):
        self.group_repo = group_repo
        self.user_repo = user_repo
        self.group_entity = group_entity
        self.user_permission_validator = user_permission_validator
        self.user_validator = user_validator

    def set_params(self, logged_user_id, school_id, teacher_id, name):
        self.logged_user_id = logged_user_id
        self.school_id = school_id
        self.teacher_id = teacher_id
        self.name = name

        return self

    def execute(self):
        self._validate()
        self._validate_data()
        group = self.group_entity.create(
            id=None,
            teacher_id=self.teacher_id,
            name=self.name
        )
        group = self.group_repo.create(group)

        return group

    def _validate(self):
        logged_user = self.user_repo.get_by_id(self.logged_user_id)
        self.user_permission_validator.is_authenticated(self.logged_user_id)
        self.user_permission_validator.is_active_user(self.logged_user_id)
        self.user_permission_validator.is_owner_of_school_or_teacher(self.logged_user_id, self.school_id)

        if logged_user.category_id == UserCategory.TEACHER_CATEGORY_ID:
            self.user_permission_validator.is_equal_users(self.logged_user_id, self.teacher_id)

    def _validate_data(self):
        self.user_validator.is_teacher_user(self.teacher_id)
        self.user_validator.is_school_ids_match(self.school_id, self.teacher_id)


class SchoolGroupRetrieveInteractor:
    logged_user_id = None
    school_id = None
    group_id = None

    def __init__(self, group_repo, user_repo, user_permission_validator):
        self.group_repo = group_repo
        self.user_repo = user_repo
        self.user_permission_validator = user_permission_validator

    def set_params(self, logged_user_id, school_id, group_id):
        self.logged_user_id = logged_user_id
        self.school_id = school_id
        self.group_id = group_id

        return self

    def execute(self):
        self._validate_user_permission()

        group = self.group_repo.get_by_school_id_and_group_id(self.school_id, self.group_id)

        return group

    def _validate_user_permission(self):
        logged_user = self.user_repo.get_by_id(self.logged_user_id)
        self.user_permission_validator.is_authenticated(self.logged_user_id)
        self.user_permission_validator.is_active_user(self.logged_user_id)
        self.user_permission_validator.is_owner_of_school_or_teacher(self.logged_user_id, self.school_id)

        if logged_user.category_id == UserCategory.TEACHER_CATEGORY_ID:
            self.user_permission_validator.is_teacher_of_group(self.logged_user_id, self.group_id)


class SchoolGroupUpdateInteractor:
    logged_user_id = None
    school_id = None
    group_id = None
    name = None

    def __init__(self, group_repo, user_repo, user_permission_validator, group_validator):
        self.group_repo = group_repo
        self.user_repo = user_repo
        self.user_permission_validator = user_permission_validator
        self.group_validator = group_validator

    def set_params(self, logged_user_id, school_id, group_id, name):
        self.logged_user_id = logged_user_id
        self.school_id = school_id
        self.group_id = group_id
        self.name = name

        return self

    def execute(self):
        self._validate_logged_user()
        self._validate_data()

        group = self.group_repo.get_by_school_id_and_group_id(self.school_id, self.group_id)
        return self._update_group(group)

    def _validate_logged_user(self):
        logged_user = self.user_repo.get_by_id(self.logged_user_id)
        self.user_permission_validator.is_authenticated(self.logged_user_id)
        self.user_permission_validator.is_active_user(self.logged_user_id)
        self.user_permission_validator.is_owner_of_school_or_teacher(self.logged_user_id, self.school_id)
        
        if logged_user.category_id == UserCategory.TEACHER_CATEGORY_ID:
            self.user_permission_validator.is_teacher_of_group(self.logged_user_id, self.group_id)

    def _validate_data(self):
        if self.name:
            self.group_validator.name_has_valid_length(self.name)

    def _update_group(self, group):
        if self.name and self.name != group.name:
            group.name = self.name

        return self.group_repo.update(group)


class SchoolGroupDeleteInteractor:
    logged_user_id = None
    school_id = None
    group_id = None

    def __init__(self, group_repo, user_repo, user_permission_validator):
        self.group_repo = group_repo
        self.user_repo = user_repo
        self.user_permission_validator = user_permission_validator

    def set_params(self, logged_user_id, school_id, group_id):
        self.logged_user_id = logged_user_id
        self.school_id = school_id
        self.group_id = group_id

        return self

    def execute(self):
        self._validate_user_permission()

        _group = self.group_repo.get_by_school_id_and_group_id(self.school_id, self.group_id)

        self.group_repo.delete_by_id(self.group_id)

        return True

    def _validate_user_permission(self):
        logged_user = self.user_repo.get_by_id(self.logged_user_id)
        self.user_permission_validator.is_authenticated(self.logged_user_id)
        self.user_permission_validator.is_active_user(self.logged_user_id)
        self.user_permission_validator.is_owner_of_school_or_teacher(self.logged_user_id, self.school_id)

        if logged_user.category_id == UserCategory.TEACHER_CATEGORY_ID:
            self.user_permission_validator.is_teacher_of_group(self.logged_user_id, self.group_id)
