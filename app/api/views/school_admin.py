from api.exceptions.decorators import catch_exception
from api.serializers.user import UserSerializer
from api.status_code import StatusCode
from api.views.base import View


class SchoolAdminCreateView(View):
    def __init__(self, school_admin_create_interactor):
        self.school_admin_create_interactor = school_admin_create_interactor

    @catch_exception
    def post(self, logged_user_id, username, phone, email, first_name, last_name, *args, **kwargs):
        school_admin = self.school_admin_create_interactor.set_params(
            logged_user_id=logged_user_id,
            username=username,
            phone=phone,
            email=email,
            first_name=first_name,
            last_name=last_name
        ).execute()

        data = UserSerializer.serialize(school_admin)

        return data, StatusCode.CREATED


class SchoolAdminRetrieveUpdateView(View):
    def __init__(self, school_admin_retrieve_admin_interactor, school_admin_update_interactor):
        self.school_admin_retrieve_admin_interactor = school_admin_retrieve_admin_interactor
        self.school_admin_update_interactor = school_admin_update_interactor

    @catch_exception
    def get(self, logged_user_id, school_admin_pk, *args, **kwargs):
        school_admin = self.school_admin_retrieve_admin_interactor.set_params(
            logged_user_id=logged_user_id,
            school_admin_pk=school_admin_pk
        ).execute()
        data = UserSerializer.serialize(school_admin)
        data['student_password'] = school_admin.student_password

        return data, StatusCode.OK

    @catch_exception
    def put(self,
            logged_user_id,
            school_admin_pk,
            username=None,
            email=None,
            phone=None,
            first_name=None,
            last_name=None,
            *args,
            **kwargs
            ):
        school_admin = self.school_admin_update_interactor.set_params(
            logged_user_id=logged_user_id,
            school_admin_pk=school_admin_pk,
            username=username,
            email=email,
            phone=phone,
            first_name=first_name,
            last_name=last_name
        ).execute()

        return UserSerializer.serialize(school_admin), StatusCode.OK
