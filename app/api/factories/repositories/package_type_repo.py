from api.factories.entities.package_type_entity import PackageTypeEntityFactory
from api.repositories.package_type_repo import PackageTypeRepo


class PackageTypeRepoFactory:
    @staticmethod
    def create():
        package_type_entity = PackageTypeEntityFactory.create()

        return PackageTypeRepo(
            package_type_entity=package_type_entity
        )
