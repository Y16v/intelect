from api.serializers.package_type_serializer import PackageTypeSerializer
from api.serializers.school import SchoolSerializer
from api.serializers.utils import AttributeUtility


class PackageProposalSerializer:
    @staticmethod
    def serialize(package_proposal):
        package_proposal = AttributeUtility(package_proposal)
        return {
            "id": package_proposal.id,
            "school_id": package_proposal.school_id,
            "package_type_id": package_proposal.package_type_id,
            "status": package_proposal.status,
            "paid": package_proposal.paid,
            "created_at": package_proposal.created_at,
            "confirmed_at": package_proposal.confirmed_at,
            "package_type":
                PackageTypeSerializer.serialize(package_proposal.package_type) if package_proposal.package_type else None,
            "school": SchoolSerializer.serialize(package_proposal.school) if package_proposal.school else None
        }

    @staticmethod
    def serialize_list(package_proposals):
        data = []
        for package_proposal in package_proposals:
            data.append(
                PackageProposalSerializer.serialize(package_proposal)
            )

        return data
