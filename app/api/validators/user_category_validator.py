from api.exceptions.exeptions import ValidationException
from api.models.constants import UserCategory


class UserCategoryValidator:
    VALID_CATEGORY_NAMES_LIST = [UserCategory.SUPER_ADMIN,
                                 UserCategory.SCHOOL_ADMIN,
                                 UserCategory.TEACHER,
                                 UserCategory.STUDENT
                                 ]
    VALID_CATEGORY_IDS_LIST = [UserCategory.SUPER_ADMIN_CATEGORY_ID,
                               UserCategory.SCHOOL_ADMIN_CATEGORY_ID,
                               UserCategory.TEACHER_CATEGORY_ID,
                               UserCategory.STUDENT_CATEGORY_ID
                               ]

    INVALID_CATEGORY_NAME = 'userCategory.name.isInvalid'
    CATEGORY_IS_NOT_IN_ACADEMICS = 'userCategory.isNotInAcademics'

    def __init__(self, user_category_repo):
        self.user_category_repo = user_category_repo

    def is_valid_category_name(self, category_name):
        if category_name not in self.VALID_CATEGORY_NAMES_LIST:
            raise ValidationException(self.INVALID_CATEGORY_NAME)

        return True

    def is_category_name_in_academic_category(self, category_name):
        if category_name not in [UserCategory.TEACHER, UserCategory.STUDENT]:
            raise ValidationException(self.CATEGORY_IS_NOT_IN_ACADEMICS)

        return True
