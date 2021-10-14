from api.exceptions.exeptions import EntityDoesNotExistException, \
    ValidationException


class SchoolValidator:
    SCHOOL_NAME_ALREADY_EXIST = 'school.name.alreadyInUse'
    SCHOOL_HAS_AVAILABLE_PACKAGE = 'school.package.stillHaveAvailable'
    SCHOOL_HAS_NOT_AVAILABLE_PACKAGE = 'school.package.isEmpty'
    SCHOOL_DOES_NOT_EXIST = 'school.doesNotExist'

    def __init__(self, user_repo, school_repo):
        self.user_repo = user_repo
        self.school_repo = school_repo

    def unique_school_name_validate(self, name):
        try:
            self.school_repo.get_by_name(name)
        except EntityDoesNotExistException:
            return True
        else:
            raise ValidationException(self.SCHOOL_NAME_ALREADY_EXIST)

    def is_school_has_not_available_packages(self, school_id):
        school = self.school_repo.get_by_id(school_id)

        if school.package > 0:
            raise ValidationException(self.SCHOOL_HAS_AVAILABLE_PACKAGE)

        return True

    def is_school_has_available_packages(self, school_id):
        school = self.school_repo.get_by_id(school_id)

        if school.package <= 0:
            raise ValidationException(self.SCHOOL_HAS_NOT_AVAILABLE_PACKAGE)

        return True

    def is_school_exist(self, school_id):
        try:
            self.school_repo.get_by_id(school_id)
        except EntityDoesNotExistException:
            raise ValidationException(self.SCHOOL_DOES_NOT_EXIST)

        return True

    def is_active_school(self, school_id):
        school = self.school_repo.get_by_id(school_id)

        if not school.is_active:
            raise ValidationException()

        return True

