from api.factories.interactors.student import *
from api.views.student import *


class SchoolStudentsListCreateViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        school_students_list_interactor = SchoolStudentsListInteractorFactory.create()
        create_student_interactor = CreateStudentInteractorFactory.create()

        return SchoolStudentsListCreateView(
            school_students_list_interactor=school_students_list_interactor,
            create_student_interactor=create_student_interactor
        )


class SchoolStudentRetrieveUpdateDeleteViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        school_student_retrieve_interactor = SchoolStudentRetrieveInteractorFactory.create()
        school_student_update_interactor = SchoolStudentUpdateInteractorFactory.create()
        delete_student_interactor = DeleteStudentInteractorFactory.create()

        return SchoolStudentRetrieveUpdateDeleteView(
            school_student_retrieve_interactor=school_student_retrieve_interactor,
            school_student_update_interactor=school_student_update_interactor,
            delete_student_interactor=delete_student_interactor
        )


class SchoolStudentUpdateAccessViewFactory:
    @staticmethod
    def create():
        school_student_update_access_interactor = SchoolStudentUpdateAccessInteractorFactory.create()

        return SchoolStudentUpdateAccessView(
            school_student_update_access_interactor=school_student_update_access_interactor
        )


class GetStudentPasswordViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        get_student_interactor = GetPasswordStudentInteractorFactory.create()
        return GetStudentPasswordView(get_student_interactor=get_student_interactor)


class GetRatingStudentsViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        get_rating_students = GetRatingStudentsInteractorFactory.create()
        return GetRatingStudentsView(get_rating_students)


class SearchStudentsViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        search_students_interactor = SearchStudentsInteractorFactory.create()

        return SearchStudentsView(
            search_students_interactor=search_students_interactor
        )
