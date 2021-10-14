from api.factories.entities.proposals import PackageProposalEntityFactory
from api.repositories.package_proposal_repo import PackageProposalRepo


class PackageProposalRepoFactory:
    @staticmethod
    def create():
        package_proposal_entity = PackageProposalEntityFactory.create()

        return PackageProposalRepo(
            package_proposal_entity=package_proposal_entity
        )
