from api.entities.proposals import SchoolProposal, IndividualStudentProposal, PackageProposal


class SchoolProposalEntity:
    @staticmethod
    def create(
            id,
            phone,
            email,
            username,
            first_name,
            last_name,
            school_name,
            *args,
            **kwargs
    ):

        return SchoolProposal(
            id=id,
            phone=phone,
            email=email,
            username=username,
            first_name=first_name,
            last_name=last_name,
            school_name=school_name
        )


class IndividualStudentProposalEntity:
    @staticmethod
    def create(
            id,
            phone,
            email,
            username,
            first_name,
            last_name,
            *args, **kwargs
    ):

        return IndividualStudentProposal(
            id=id,
            phone=phone,
            email=email,
            username=username,
            first_name=first_name,
            last_name=last_name,
        )


class PackageProposalEntity:
    @staticmethod
    def create(id, school_id, package_type_id, status, paid, created_at, confirmed_at, *args, **kwargs):
        return PackageProposal(
            id=id,
            school_id=school_id,
            package_type_id=package_type_id,
            status=status,
            paid=paid,
            created_at=created_at,
            confirmed_at=confirmed_at
        )


class SchoolProposalEntityFactory:
    @staticmethod
    def create():
        return SchoolProposalEntity


class IndividualStudentProposalEntityFactory:
    @staticmethod
    def create():
        return IndividualStudentProposalEntity


class PackageProposalEntityFactory:
    @staticmethod
    def create():
        return PackageProposalEntity
