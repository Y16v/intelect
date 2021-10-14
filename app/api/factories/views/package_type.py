from api.factories.interactors.package_type import PackageTypeListInteractorFactory
from api.views.package_type import PackageTypeListView


class PackageTypeListViewFactory:
    @staticmethod
    def create():
        package_type_list_interactor = PackageTypeListInteractorFactory.create()

        return PackageTypeListView(
            package_type_list_interactor=package_type_list_interactor
        )
