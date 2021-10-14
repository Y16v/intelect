from api.exceptions.exeptions import EntityDoesNotExistException, InvalidEntityException, ValidationException


class PackageTypeValidator:
    PACKAGE_TYPE_DOES_NOT_EXIST = 'packageType.object.doesNotExist'
    PACKAGE_TYPE_SHOULD_BE_FOR_SCHOOLS = 'packageType.shouldBeForSchools'

    def __init__(self, school_repo, package_type_repo):
        self.school_repo = school_repo
        self.package_type_repo = package_type_repo

    def is_package_type_exists(self, package_type_id):
        try:
            self.package_type_repo.get_by_id(package_type_id)
        except EntityDoesNotExistException:
            raise EntityDoesNotExistException(self.PACKAGE_TYPE_DOES_NOT_EXIST)

        return True

    def is_available_for_not_individual_schools(self, package_type_id):
        package_type = self.package_type_repo.get_by_id(package_type_id)

        if package_type.is_for_individual_students:
            raise ValidationException(self.PACKAGE_TYPE_SHOULD_BE_FOR_SCHOOLS)

        return True
