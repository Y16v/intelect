from api.views.school import SchoolListCreateView, SchoolRetrieveUpdateDeleteView, UpdateSchoolPackageTypeView, \
    SchoolUpdatePackageView, SearchSchoolsView
from api.factories.interactors.school import (
    SchoolListInteractorFactory,
    SchoolCreateInteractorFactory,
    RetrieveSchoolInteractorFactory,
    UpdateSchoolInteractorFactory,
    DeleteSchoolInteractorFactory,
    UpdateSchoolPackageTypeInteractorFactory, UpdateSchoolPackageInteractorFactory, SearchSchoolsInteractorFactory)


class SchoolListCreateViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        school_list_interactor = SchoolListInteractorFactory.create()
        school_create_interactor = SchoolCreateInteractorFactory.create()

        return SchoolListCreateView(
            school_list_interactor=school_list_interactor,
            school_create_interactor=school_create_interactor,
        )


class SearchSchoolsViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        search_schools_interactor = SearchSchoolsInteractorFactory.create()

        return SearchSchoolsView(
            search_schools_interactor=search_schools_interactor
        )


class SchoolRetrieveUpdateDeleteViewFactory:
    @staticmethod
    def create():
        retrieve_school_interactor = RetrieveSchoolInteractorFactory.create()
        update_school_interactor = UpdateSchoolInteractorFactory.create()
        delete_school_interactor = DeleteSchoolInteractorFactory.create()

        return SchoolRetrieveUpdateDeleteView(
            retrieve_school_interactor=retrieve_school_interactor,
            update_school_interactor=update_school_interactor,
            delete_school_interactor=delete_school_interactor
        )


class UpdateSchoolPackageTypeViewFactory:
    @staticmethod
    def create():
        update_school_package_interactor = UpdateSchoolPackageTypeInteractorFactory.create()

        return UpdateSchoolPackageTypeView(
            update_school_package_type_interactor=update_school_package_interactor
        )


class UpdateSchoolPackageViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        school_add_package_interactor = UpdateSchoolPackageInteractorFactory.create()

        return SchoolUpdatePackageView(
            school_add_package_interactor=school_add_package_interactor
        )
