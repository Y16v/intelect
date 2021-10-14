from django.utils import timezone
from dateutil.relativedelta import relativedelta
from api.exceptions.exeptions import NoLoggedException, NoPermissionException, USER_PERMISSION_DENIED, \
    SCHOOL_PERMISSION_DENIED, USER_EXPIRED
from api.models.constants import UserCategory, VALIDITY_ON_MONTHS


class LoginInteractor:
    def __init__(self, user_repo, auth_service, package_type_repo):
        self.user_repo = user_repo
        self.auth_service = auth_service
        self.package_type_repo = package_type_repo

    def set_params(self, username, password):
        self.username = username
        self.password = password
        return self

    def execute(self):
        user = self.user_repo.get_by_username(username=self.username)
        self.user_repo.check_password(user, self.password)
        auth_token = self.auth_service.create_auth_token(user.id)
        if user.school_id:
            package_type = self.package_type_repo.get_by_school_id(school_id=user.school_id)
        else:
            package_type = None
        if not user.active_until and package_type and user.category_id in UserCategory.CAN_PAYMENT_CATEGORY_IDS:
            user.active_until = relativedelta(months=package_type.item_month_duration) + timezone.now()
            self.user_repo.update(user)
        auth_token.user = user
        return auth_token


class AuthenticateInteractor:
    def __init__(self, auth_service):
        self.auth_service = auth_service

    def set_params(self, access_token):
        self.access_token = access_token
        return self

    def execute(self):
        logged_id = self.auth_service.get_user_id_of_auth_token(self.access_token)
        return logged_id


class LoadUserActiveInteractor:
    CHECK_CATEGORIES = [UserCategory.TEACHER, UserCategory.STUDENT]

    def __init__(self, user_repo, user_category_repo, school_repo, package_type_repo):
        self.user_repo = user_repo
        self.school_repo = school_repo
        self.user_category_repo = user_category_repo
        self.package_type_repo = package_type_repo

    def set_params(self, logged_id):
        self.logged_id = logged_id
        return self

    def execute(self):
        self._validate()
        user = self.user_repo.get_by_id(self.logged_id)
        rest_of_days = None
        if user.school_id:
            package_type = self.package_type_repo.get_by_school_id(school_id=user.school_id)
        else:
            package_type = None
        if user.active_until and package_type:
            rest_of_days = user.active_until - timezone.now()
        return {
            'rest_of_days': rest_of_days and rest_of_days.days
        }

    def _validate(self):
        if not self.logged_id:
            raise NoLoggedException()
        user = self.user_repo.get_by_id(self.logged_id)
        user_category = self.user_category_repo.get_by_id(user.category_id)
        if not user.is_active:
            raise NoPermissionException(USER_PERMISSION_DENIED)
        if user_category.name in self.CHECK_CATEGORIES:
            school = self.school_repo.get_by_id(user.school_id)
            if not school.is_active:
                raise NoPermissionException(SCHOOL_PERMISSION_DENIED)
        if user.active_until and user.active_until <= timezone.now():
            raise NoPermissionException(USER_EXPIRED)
