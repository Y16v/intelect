from api.factories.repositories.proposals import PackageProposalRepoFactory
from api.validators.package_proposal_validator import PackageProposalValidator


class PackageProposalValidatorFactory:
    @staticmethod
    def create():
        package_proposal_repo = PackageProposalRepoFactory.create()

        return PackageProposalValidator(
            package_proposal_repo=package_proposal_repo
        )
