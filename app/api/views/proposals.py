from api.exceptions.decorators import catch_exception
from api.serializers.proposals import PackageProposalSerializer
from api.status_code import StatusCode
from api.views.base import View


class PackageProposalListCreateView(View):
    def __init__(self,
                 create_package_proposal_interactor,
                 package_proposal_list_interactor
                 ):
        self.create_package_proposal_interactor = create_package_proposal_interactor
        self.package_proposal_list_interactor = package_proposal_list_interactor

    @catch_exception
    def post(self, logged_user_id, school_id, package_type_id, *args, **kwargs):
        package_proposal = self.create_package_proposal_interactor.set_params(
            logged_user_id=logged_user_id,
            school_id=school_id,
            package_type_id=package_type_id
        ).execute()

        return PackageProposalSerializer.serialize(package_proposal), StatusCode.CREATED

    @catch_exception
    def get(self, logged_user_id, school_id=None, status=None, page=1, count=10, *args, **kwargs):
        package_proposals, total = self.package_proposal_list_interactor.set_params(
            logged_user_id=logged_user_id,
            school_id=school_id,
            status=status,
            page=page,
            count=count
        ).execute()

        data = {
            "total": total,
            "package_proposals": PackageProposalSerializer.serialize_list(package_proposals)
        }

        return data, StatusCode.OK


class UpdatePackageProposalStatusView(View):
    def __init__(self, update_package_proposal_status_interactor):
        self.update_package_proposal_status_interactor = update_package_proposal_status_interactor

    @catch_exception
    def put(self, logged_user_id, package_proposal_id, status, *args, **kwargs):
        self.update_package_proposal_status_interactor.set_params(
            logged_user_id=logged_user_id,
            package_proposal_id=package_proposal_id,
            status=status
        ).execute()

        return True, StatusCode.OK
