

class PackageTypeListInteractor:
    logged_user_id = None
    is_for_individual_students = None

    def __init__(self, package_type_repo):
        self.package_type_repo = package_type_repo

    def set_params(self, logged_user_id, is_for_individual_students):
        self.logged_user_id = logged_user_id
        self.is_for_individual_students = is_for_individual_students

        return self

    def execute(self):
        if self.is_for_individual_students:
            return self.package_type_repo.get_individual_students_package_types()

        return self.package_type_repo.get_school_package_types()
