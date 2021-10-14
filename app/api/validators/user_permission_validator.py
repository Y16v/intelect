from api.exceptions.exeptions import EntityDoesNotExistException, NoLoggedException, NoPermissionException
from api.exceptions.messages import USER_PERMISSION_DENIED
from api.models.constants import UserCategory


class UserPermissionValidator:
    AUTH_REQUIRED = 'user.auth.required'
    USER_IS_NOT_ACTIVE = 'user.isNotActive'
    SUPERUSER_ROLE_REQUIRED = 'user.category.superuserRequired'
    USER_IS_NOT_SCHOOL_OWNER = 'user.permission.mustBeOwnerOfSchool'
    USER_IS_NOT_GROUPS_TEACHER = 'user.permission.isNotGroupsTeacher'
    USER_MUST_BE_SUPERUSER_OR_OWNER_OF_SCHOOL = 'user.permission.mustBeSuperuserOrOwnerOfSchool'
    USER_MUST_BE_OWNER_OR_TEACHER_OF_SCHOOL = 'user.permission.mustBeOwnerOrTeacherOfSchool'
    SCHOOL_IS_NOT_ACTIVE = 'school.isNotActive'

    GROUP_CREATABLE_USER_CATEGORIES = [UserCategory.SCHOOL_ADMIN_CATEGORY_ID]

    def __init__(self,
                 user_repo,
                 school_repo,
                 group_repo,
                 user_category_repo,
                 package_proposal_repo
                 ):
        self.user_repo = user_repo
        self.school_repo = school_repo
        self.group_repo = group_repo
        self.user_category_repo = user_category_repo
        self.package_proposal_repo = package_proposal_repo

    def is_authenticated(self, logged_user_id):
        try:
            self.user_repo.get_by_id(logged_user_id)
        except EntityDoesNotExistException:
            raise NoLoggedException()

        return True

    def is_active_user(self, user_id):
        user = self.user_repo.get_by_id(user_id)

        if not user.is_active:
            raise NoPermissionException(self.USER_IS_NOT_ACTIVE)

        return True

    def is_superuser(self, user_id, raise_exception=True):
        user = self.user_repo.get_by_id(user_id)

        if not user.category_id == UserCategory.SUPER_ADMIN_CATEGORY_ID:
            if raise_exception:
                raise NoPermissionException()
            return False
        return True

    def is_school_admin_user(self, user_id):
        user = self.user_repo.get_by_id(user_id)

        if not user.category_id == UserCategory.SCHOOL_ADMIN_CATEGORY_ID:
            raise NoPermissionException()

        return True

    def is_active_school(self, school_id):
        school = self.school_repo.get_by_id(school_id)

        if not school.is_active:
            raise NoPermissionException(self.SCHOOL_IS_NOT_ACTIVE)

        return True

    def is_teacher_user(self, user_id):
        user = self.user_repo.get_by_id(user_id)

        if not user.category_id == UserCategory.TEACHER_CATEGORY_ID:
            raise NoPermissionException()

        return True

    def is_student_user(self, user_id):
        user = self.user_repo.get_by_id(user_id)

        if not user.category_id == UserCategory.STUDENT_CATEGORY_ID:
            raise NoPermissionException()

        return True

    def is_equal_users(self, first_user_id, second_user_id, exc_message=USER_PERMISSION_DENIED):
        if int(first_user_id) != int(second_user_id):
            raise NoPermissionException(exc_message)

        return True

    def is_user_not_super_admin(self, user_id):
        user = self.user_repo.get_by_id(user_id)

        if user.category_id == UserCategory.SUPER_ADMIN_CATEGORY_ID:
            raise NoPermissionException()

        return True

    def is_not_student(self, user_id):
        user = self.user_repo.get_by_id(user_id)

        if user.category_id == UserCategory.STUDENT_CATEGORY_ID:
            return NoPermissionException()

        return True

    def is_superuser_or_owner_of_school(self, user_id, school_id):
        user = self.user_repo.get_by_id(user_id)

        if user.category_id == UserCategory.SUPER_ADMIN_CATEGORY_ID:
            return True

        if user.category_id == UserCategory.SCHOOL_ADMIN_CATEGORY_ID \
                and user.school_id == school_id:
            return True

        raise NoPermissionException(self.USER_MUST_BE_SUPERUSER_OR_OWNER_OF_SCHOOL)

    def is_owner_of_school(self, user_id, school_id):
        user = self.user_repo.get_by_id(user_id)

        if user.category_id == UserCategory.SCHOOL_ADMIN_CATEGORY_ID \
                and user.school_id == school_id:
            return True

        raise NoPermissionException(self.USER_IS_NOT_SCHOOL_OWNER)

    def is_owner_of_school_or_teacher(self, user_id, school_id):
        user = self.user_repo.get_by_id(user_id)

        if user.category_id in [UserCategory.SCHOOL_ADMIN_CATEGORY_ID, UserCategory.TEACHER_CATEGORY_ID] \
                and user.school_id == school_id:
            return True

        raise NoPermissionException(self.USER_MUST_BE_OWNER_OR_TEACHER_OF_SCHOOL)

    def is_user_has_permission_to_update_academic(self, user_id, academic_id):
        user = self.user_repo.get_by_id(user_id)
        student = self.user_repo.get_by_id(academic_id)

        if user.category_id != UserCategory.SCHOOL_ADMIN_CATEGORY_ID and \
                user.school_id != student.school_id:
            raise NoPermissionException()

        return True

    def is_academic_user(self, user_id):
        user = self.user_repo.get_by_id(user_id)

        if user.category_id not in [UserCategory.TEACHER_CATEGORY_ID, UserCategory.STUDENT_CATEGORY_ID]:
            raise NoPermissionException()

        return True

    def check_password(self, user_id, password):
        user = self.user_repo.get_by_id(user_id)
        self.user_repo.check_password(user, password)

        return True

    def is_school_admin_of_academic_school(self, user_id, academic_id, raise_exception=True):
        user = self.user_repo.get_by_id(user_id)
        student = self.user_repo.get_by_id(academic_id)

        if user.category_id != UserCategory.SCHOOL_ADMIN_CATEGORY_ID and \
                user.school_id != student.school_id:
            if raise_exception:
                raise NoPermissionException()

            return False

        return True

    def is_teacher_of_student(self, user_id, student_id, raise_exceptions=True):
        user = self.user_repo.get_by_id(user_id)
        student = self.user_repo.get_by_id(student_id)

        if student.teacher_id != user.id:
            if raise_exceptions:
                raise NoPermissionException()

            return False

        return True

    def is_teacher_of_group(self, teacher_id, group_id):
        group = self.group_repo.get_by_id(group_id)

        if group.teacher_id != teacher_id:
            raise NoPermissionException(self.USER_IS_NOT_GROUPS_TEACHER)

        return True

    def is_owner_of_proposal(self, user_id, proposal_id):
        package_proposal = self.package_proposal_repo.get_by_id(proposal_id)
        school = self.school_repo.get_by_id(package_proposal.school_id)

        if school.owner_id != user_id:
            raise NoPermissionException(self.USER_IS_NOT_SCHOOL_OWNER)

        return True
