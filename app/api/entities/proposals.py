
class SchoolProposal:
    def __init__(self,
                 id: str,
                 phone: str,
                 email: str,
                 username: str,
                 first_name: str,
                 last_name: str,
                 school_name: str,
                 ):
        self.id = id
        self.phone = phone
        self.email = email
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.school_name = school_name


class IndividualStudentProposal:
    def __init__(self,
                 id,
                 phone: str,
                 email: str,
                 username: str,
                 first_name: str,
                 last_name: str,
                 ):

        self.id = id
        self.phone = phone
        self.email = email
        self.username = username
        self.first_name = first_name
        self.last_name = last_name


class PackageProposal:
    def __init__(self,
                 id,
                 school_id,
                 package_type_id,
                 status,
                 paid,
                 created_at,
                 confirmed_at
                 ):
        self.id = id
        self.school_id = school_id
        self.package_type_id = package_type_id
        self.status = status
        self.paid = paid
        self.created_at = created_at
        self.confirmed_at = confirmed_at