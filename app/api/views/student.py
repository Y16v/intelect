from api.exceptions.decorators import catch_exception
from api.serializers.user import UserSerializer
from api.status_code import StatusCode
from api.views.base import View


class SchoolStudentsListCreateView(View):
    def __init__(self, school_students_list_interactor, create_student_interactor):
        self.school_students_list_interactor = school_students_list_interactor
        self.create_student_interactor = create_student_interactor

    @catch_exception
    def get(self, logged_user_id, school_pk, teacher_pk=None, *args, **kwargs):
        students = self.school_students_list_interactor.set_params(
            logged_user_id=logged_user_id,
            school_pk=school_pk,
            teacher_pk=teacher_pk
        ).execute()
        data = UserSerializer.list_serialize(students)
        return data, StatusCode.OK

    @catch_exception
    def post(self, logged_user_id, school_pk, teacher_id, category, student_data, group_id=None, *args, **kwargs):
        student = self.create_student_interactor.set_params(
            logged_id=logged_user_id,
            school_id=school_pk,
            teacher_id=teacher_id,
            group_id=group_id,
            category=category,
            student_data=student_data
        ).execute()
        body = UserSerializer.serialize(student)
        status = StatusCode.CREATED
        return body, status


class GetStudentPasswordView:
    def __init__(self, get_student_interactor):
        self.get_student_interactor = get_student_interactor

    @catch_exception
    def get(self, logged_user_id, student_pk, *args, **kwargs):
        body = self.get_student_interactor.set_params(logged_user_id, student_pk).execute()
        status = StatusCode.OK
        return body, status


class SchoolStudentRetrieveUpdateDeleteView(View):
    def __init__(self, school_student_retrieve_interactor, school_student_update_interactor, delete_student_interactor):
        self.school_student_retrieve_interactor = school_student_retrieve_interactor
        self.school_student_update_interactor = school_student_update_interactor
        self.delete_student_interactor = delete_student_interactor

    @catch_exception
    def get(self, logged_user_id, school_pk, student_pk, *args, **kwargs):
        student = self.school_student_retrieve_interactor.set_params(
            logged_user_id=logged_user_id,
            school_pk=school_pk,
            student_pk=student_pk
        ).execute()

        return UserSerializer.serialize(student), StatusCode.OK

    @catch_exception
    def put(self,
            logged_user_id,
            school_pk,
            student_pk,

            teacher_id=None,
            group_id=None,
            username=None,
            email=None,
            phone=None,
            first_name=None,
            last_name=None,
            *args,
            **kwargs
            ):
        student = self.school_student_update_interactor.set_params(
            logged_user_id,
            school_pk,
            student_pk,

            teacher_id=teacher_id,
            group_id=group_id,
            username=username,
            email=email,
            phone=phone,
            first_name=first_name,
            last_name=last_name,
        ).execute()

        return UserSerializer.serialize(student), StatusCode.OK

    @catch_exception
    def delete(self, logged_user_id, school_pk, student_pk, *args, **kwargs):
        student_id = self.delete_student_interactor.set_params(
            logged_user_id=logged_user_id, school_pk=school_pk, student_pk=student_pk
        ).execute()
        body = {
            'student_id': student_id
        }
        status = StatusCode.OK
        return body, status


class SchoolStudentUpdateAccessView:
    def __init__(self, school_student_update_access_interactor):
        self.school_student_update_access_interactor = school_student_update_access_interactor

    @catch_exception
    def put(self, logged_user_id, school_pk, student_pk, *args, **kwargs):
        student = self.school_student_update_access_interactor.set_params(
            logged_user_id=logged_user_id,
            school_pk=school_pk,
            student_pk=student_pk
        ).execute()

        return UserSerializer.serialize(student), StatusCode.OK


class GetRatingStudentsView:
    def __init__(self, get_rating_students):
        self.get_rating_students = get_rating_students

    def get(self, logged_user_id, page, *args, **kwargs):
        students = self.get_rating_students.set_params(logged_user_id, page).execute()
        body = UserSerializer.list_serialize(students)
        status = StatusCode.OK
        return body, status


class SearchStudentsView:
    def __init__(self, search_students_interactor):
        self.search_students_interactor = search_students_interactor

    @catch_exception
    def get(self, q, school_id=None, teacher_id=None, group_id=None, played_at=None, page=1, count=10, *args, **kwargs):
        students, total = self.search_students_interactor.set_params(
            q=q,
            school_id=school_id,
            teacher_id=teacher_id,
            group_id=group_id,
            played_at=played_at,
            page=page,
            count=count
        ).execute()

        data = {
            "total": total,
            "students": UserSerializer.list_serialize(students)
        }

        return data, StatusCode.OK
