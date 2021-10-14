from api.views.school_admin import SchoolAdminCreateView, SchoolAdminRetrieveUpdateView
from api.factories.interactors.school_admin import SchoolAdminCreateInteractorFactory, \
    SchoolAdminRetrieveInteractorFactory, SchoolAdminUpdateInteractorFactory


class SchoolAdminCreateViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        school_admin_create_interactor = SchoolAdminCreateInteractorFactory.create()

        return SchoolAdminCreateView(
            school_admin_create_interactor=school_admin_create_interactor
        )


class SchoolAdminRetrieveUpdateViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        school_admin_retrieve_interactor = SchoolAdminRetrieveInteractorFactory.create()
        school_admin_update_interactor = SchoolAdminUpdateInteractorFactory.create()

        return SchoolAdminRetrieveUpdateView(
            school_admin_retrieve_admin_interactor=school_admin_retrieve_interactor,
            school_admin_update_interactor=school_admin_update_interactor
        )
