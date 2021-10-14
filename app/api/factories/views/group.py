from api.factories.interactors.group import SchoolGroupListInteractorFactory, SchoolGroupCreateInteractorFactory, \
    SchoolGroupUpdateInteractorFactory, SchoolGroupRetrieveInteractorFactory, SchoolGroupDeleteInteractorFactory
from api.views.group import GroupListCreateView, SchoolGroupRetrieveUpdateDeleteView


class SchoolGroupsListCreateViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        group_list_interactor = SchoolGroupListInteractorFactory.create()
        group_create_interactor = SchoolGroupCreateInteractorFactory.create()

        return GroupListCreateView(
            group_list_interactor=group_list_interactor,
            group_create_interactor=group_create_interactor
        )


class SchoolGroupRetrieveUpdateDeleteViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        school_group_retrieve_interactor = SchoolGroupRetrieveInteractorFactory.create()
        school_group_update_interactor = SchoolGroupUpdateInteractorFactory.create()
        school_group_delete_interactor = SchoolGroupDeleteInteractorFactory.create()

        return SchoolGroupRetrieveUpdateDeleteView(
            school_group_retrieve_interactor=school_group_retrieve_interactor,
            school_group_update_interactor=school_group_update_interactor,
            school_group_delete_interactor=school_group_delete_interactor
        )
