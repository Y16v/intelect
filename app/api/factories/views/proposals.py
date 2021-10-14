from api.factories.interactors.package_proposals import CreatePackageProposalInteractorFactory, \
    PackageProposalListInteractorFactory, UpdatePackageProposalStatusInteractorFactory
from api.views.proposals import PackageProposalListCreateView, UpdatePackageProposalStatusView


class PackageProposalListCreateViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        create_package_proposal_interactor = CreatePackageProposalInteractorFactory.create()
        package_proposal_list_interactor = PackageProposalListInteractorFactory.create()

        return PackageProposalListCreateView(
            create_package_proposal_interactor=create_package_proposal_interactor,
            package_proposal_list_interactor=package_proposal_list_interactor
        )


class UpdatePackageProposalStatusViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        update_package_proposal_status_interactor = UpdatePackageProposalStatusInteractorFactory.create()

        return UpdatePackageProposalStatusView(
            update_package_proposal_status_interactor=update_package_proposal_status_interactor
        )
