from api.exceptions.decorators import catch_exception
from api.serializers.user import UserSerializer
from api.status_code import StatusCode


class TeachersView:
    def __init__(self, get_teachers_in_school_interactor):
        self.get_teachers_in_school_interactor = get_teachers_in_school_interactor

    @catch_exception
    def get(self, logged_user_id, school_pk, *args, **kwargs):
        teachers = self.get_teachers_in_school_interactor.set_params(logged_user_id, school_pk).execute()
        body = UserSerializer.list_serialize(teachers)
        status = StatusCode.OK
        return body, status


class SchoolTeacherRetrieveUpdateView:
    def __init__(self, school_teacher_update_interactor):
        self.school_teacher_update_interactor = school_teacher_update_interactor

    @catch_exception
    def put(self,
            logged_user_id,
            school_pk,
            teacher_pk,

            username=None,
            email=None,
            phone=None,
            first_name=None,
            last_name=None,
            *args,
            **kwargs
            ):
        teacher = self.school_teacher_update_interactor.set_params(
            logged_user_id=logged_user_id,
            school_pk=school_pk,
            teacher_pk=teacher_pk,
            username=username,
            email=email,
            phone=phone,
            first_name=first_name,
            last_name=last_name
        ).execute()

        return UserSerializer.serialize(teacher), StatusCode.OK


class SchoolTeacherUpdateAccessView:
    def __init__(self, school_teacher_update_access_interactor):
        self.school_teacher_update_access_interactor = school_teacher_update_access_interactor

    @catch_exception
    def put(self, logged_user_id, school_pk, teacher_pk, *args, **kwargs):
        school = self.school_teacher_update_access_interactor.set_params(
            logged_user_id=logged_user_id,
            school_pk=school_pk,
            teacher_pk=teacher_pk
        ).execute()

        return UserSerializer.serialize(school), StatusCode.OK
