from api.models.constants import PackageProposalStatuses
from django.utils import timezone


class CreatePackageProposalInteractor:
    logged_user_id = None
    school_id = None
    package_type_id = None

    def __init__(self,
                 package_proposal_repo,
                 package_proposal_entity,
                 user_permission_validator,
                 school_validator,
                 package_type_validator
                 ):
        self.package_proposal_repo = package_proposal_repo
        self.package_proposal_entity = package_proposal_entity
        self.user_permission_validator = user_permission_validator
        self.school_validator = school_validator
        self.package_type_validator = package_type_validator

    def set_params(self, logged_user_id, school_id, package_type_id):
        self.logged_user_id = logged_user_id
        self.school_id = school_id
        self.package_type_id = package_type_id

        return self

    def execute(self):
        self._validate_permissions()
        self._validate_data()

        package_proposal_entity = self.package_proposal_entity.create(
            id=None,
            school_id=self.school_id,
            package_type_id=self.package_type_id,
            status=PackageProposalStatuses.pending,
            paid=False,
            created_at=None,
            confirmed_at=None
        )

        package_proposal = self.package_proposal_repo.create(package_proposal_entity)

        return package_proposal

    def _validate_permissions(self):
        self.user_permission_validator.is_authenticated(self.logged_user_id)
        self.user_permission_validator.is_active_user(self.logged_user_id)
        self.user_permission_validator.is_owner_of_school(self.logged_user_id, self.school_id)

    def _validate_data(self):
        self.school_validator.is_school_exist(self.school_id)
        self.school_validator.is_active_school(self.school_id)

        self.package_type_validator.is_package_type_exists(self.package_type_id)
        self.package_type_validator.is_available_for_not_individual_schools(self.package_type_id)


class PackageProposalListInteractor:
    logged_user_id = None
    school_id = None
    status = None
    page = None
    count = None

    def __init__(self, package_proposal_repo, package_type_repo, school_repo, user_permission_validator):
        self.package_proposal_repo = package_proposal_repo
        self.package_type_repo = package_type_repo
        self.school_repo = school_repo
        self.user_permission_validator = user_permission_validator

    def set_params(self, logged_user_id, school_id, status, page, count):
        self.logged_user_id = logged_user_id
        self.school_id = school_id
        self.status = status
        self.page = page
        self.count = count

        return self

    def execute(self):
        package_proposals, total = self.package_proposal_repo.filter_with_pagination(
            school_id=self.school_id,
            status=self.status,
            page=self.page,
            count=self.count
        )

        for package_proposal in package_proposals:
            package_proposal.package_type = self.package_type_repo.get_by_id(package_proposal.package_type_id)
            package_proposal.school = self.school_repo.get_by_id(package_proposal.school_id)

        return package_proposals, total

    def _validate_user_permission(self):
        self.user_permission_validator.is_authenticated(self.logged_user_id)
        self.user_permission_validator.is_active_user(self.logged_user_id)

        if not self.school_id:
            self.user_permission_validator.is_superuser(self.logged_user_id)
            return True

        else:
            self.user_permission_validator.is_superuser_or_owner_of_school(self.logged_user_id, self.school_id)
            return True


class UpdatePackageProposalStatusInteractor:
    logged_user_id = None
    package_proposal_id = None
    status = None

    def __init__(self, package_proposal_repo, school_repo, package_type_repo, user_permission_validator, package_proposal_validator):
        self.package_proposal_repo = package_proposal_repo
        self.school_repo = school_repo
        self.package_type_repo = package_type_repo
        self.user_permission_validator = user_permission_validator
        self.package_proposal_validator = package_proposal_validator

    def set_params(self, logged_user_id, package_proposal_id, status):
        self.logged_user_id = logged_user_id
        self.package_proposal_id = package_proposal_id
        self.status = status

        return self

    def execute(self):
        self._validate_user_permission()
        self._validate_data()

        package_proposal = self.package_proposal_repo.get_by_id(self.package_proposal_id)
        package_proposal.status = self.status

        if self.status == PackageProposalStatuses.confirmed:
            school = self.school_repo.get_by_id(package_proposal.school_id)
            package_type = self.package_type_repo.get_by_id(package_proposal.package_type_id)

            school.package_type_id = package_type.id
            school.package += package_type.accounts_quantity
            package_proposal.confirmed_at = timezone.now()

            self.school_repo.update(school)

        self.package_proposal_repo.update(package_proposal)

        return True

    def _validate_user_permission(self):
        self.user_permission_validator.is_authenticated(self.logged_user_id)
        self.user_permission_validator.is_active_user(self.logged_user_id)

        if self.status == PackageProposalStatuses.canceled:
            self.user_permission_validator.is_owner_of_proposal(self.logged_user_id, self.package_proposal_id)
            return True

        self.user_permission_validator.is_superuser(self.logged_user_id)

    def _validate_data(self):
        self.package_proposal_validator.is_package_proposal_pending(self.package_proposal_id)
        self.package_proposal_validator.is_valid_status_for_update(self.status)
