from api.validators.package_type_validator import PackageTypeValidator

from api.factories.repositories.package_type_repo import PackageTypeRepoFactory
from api.factories.repositories.school_repo import SchoolRepoFactory


class PackageTypeValidatorFactory:
    @staticmethod
    def create():
        school_repo = SchoolRepoFactory.create()
        package_type_repo = PackageTypeRepoFactory.create()

        return PackageTypeValidator(
            school_repo=school_repo,
            package_type_repo=package_type_repo
        )
