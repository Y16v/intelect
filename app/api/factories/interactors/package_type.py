from api.factories.repositories.package_type_repo import PackageTypeRepoFactory
from api.interactors.package_type import PackageTypeListInteractor


class PackageTypeListInteractorFactory:
    @staticmethod
    def create():
        package_type_repo = PackageTypeRepoFactory.create()

        return PackageTypeListInteractor(
            package_type_repo=package_type_repo
        )
