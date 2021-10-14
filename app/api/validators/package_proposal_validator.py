from api.exceptions.exeptions import ValidationException
from api.models.constants import PackageProposalStatuses


class PackageProposalValidator:
    INVALID_STATUS_FOR_UPDATE = "packageProposal.status.InvalidForUpdate"
    NOT_ALLOWED_TO_UPDATE_STATUS = "packageProposal.status.NotAllowedToUpdate"

    def __init__(self, package_proposal_repo):
        self.package_proposal_repo = package_proposal_repo

    def is_valid_status_for_update(self, status_code):
        if status_code not in [PackageProposalStatuses.canceled,
                               PackageProposalStatuses.rejected,
                               PackageProposalStatuses.confirmed]:

            raise ValidationException(self.INVALID_STATUS_FOR_UPDATE)

        return True

    def is_package_proposal_pending(self, package_proposal_id):
        package_proposal = self.package_proposal_repo.get_by_id(package_proposal_id)

        if package_proposal.status != PackageProposalStatuses.pending:
            raise ValidationException(self.NOT_ALLOWED_TO_UPDATE_STATUS)

        return True
