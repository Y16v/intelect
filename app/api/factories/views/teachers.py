from api.factories.interactors.teacher import GetSchoolTeacherInteractorFactory, SchoolTeacherUpdateInteractorFactory, \
    SchoolTeacherUpdateAccessInteractorFactory
from api.views.teacher import TeachersView, SchoolTeacherRetrieveUpdateView, SchoolTeacherUpdateAccessView


class TeachersViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        get_teachers_in_school_interactor = GetSchoolTeacherInteractorFactory.create()
        return TeachersView(
            get_teachers_in_school_interactor=get_teachers_in_school_interactor
        )


class SchoolTeacherRetrieveUpdateViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        school_teacher_update_interactor = SchoolTeacherUpdateInteractorFactory.create()

        return SchoolTeacherRetrieveUpdateView(
            school_teacher_update_interactor=school_teacher_update_interactor
        )


class SchoolTeacherUpdateAccessViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        school_teacher_update_access_interactor = SchoolTeacherUpdateAccessInteractorFactory.create()

        return SchoolTeacherUpdateAccessView(
            school_teacher_update_access_interactor=school_teacher_update_access_interactor
        )
