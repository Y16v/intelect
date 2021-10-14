from api.factories.entities.proposals import PackageProposalEntityFactory
from api.factories.repositories.package_type_repo import PackageTypeRepoFactory
from api.factories.repositories.proposals import PackageProposalRepoFactory
from api.factories.repositories.school_repo import SchoolRepoFactory
from api.factories.validators.package_proposal_validator import PackageProposalValidatorFactory
from api.factories.validators.package_type_validator import PackageTypeValidatorFactory
from api.factories.validators.school_validator import SchoolValidatorFactory
from api.factories.validators.user_permission_validator import UserPermissionValidatorFactory
from api.interactors.package_proposal import CreatePackageProposalInteractor, PackageProposalListInteractor, \
    UpdatePackageProposalStatusInteractor


class CreatePackageProposalInteractorFactory:
    @staticmethod
    def create():
        package_proposal_repo = PackageProposalRepoFactory.create()
        package_proposal_entity = PackageProposalEntityFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()
        school_validator = SchoolValidatorFactory.create()
        package_type_validator = PackageTypeValidatorFactory.create()

        return CreatePackageProposalInteractor(
            package_proposal_repo=package_proposal_repo,
            package_proposal_entity=package_proposal_entity,
            user_permission_validator=user_permission_validator,
            school_validator=school_validator,
            package_type_validator=package_type_validator
        )


class PackageProposalListInteractorFactory:
    @staticmethod
    def create():
        package_proposal_repo = PackageProposalRepoFactory.create()
        package_type_repo = PackageTypeRepoFactory.create()
        school_repo = SchoolRepoFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()

        return PackageProposalListInteractor(
            package_proposal_repo=package_proposal_repo,
            package_type_repo=package_type_repo,
            user_permission_validator=user_permission_validator,
            school_repo=school_repo
        )


class UpdatePackageProposalStatusInteractorFactory:
    @staticmethod
    def create():
        package_proposal_repo = PackageProposalRepoFactory.create()
        school_repo = SchoolRepoFactory.create()
        package_type_repo = PackageTypeRepoFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()
        package_proposal_validator = PackageProposalValidatorFactory.create()

        return UpdatePackageProposalStatusInteractor(
            package_proposal_repo=package_proposal_repo,
            user_permission_validator=user_permission_validator,
            package_proposal_validator=package_proposal_validator,
            school_repo=school_repo,
            package_type_repo=package_type_repo
        )
