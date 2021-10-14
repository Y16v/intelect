
class School:
    def __init__(self,
                 id: int,
                 owner_id: int,
                 package_type_id: int,
                 name: str,
                 package: int,
                 is_active: bool,
                 created_at: str,
                 is_for_individual_students: bool,
                 ):
        self.id = id
        self.owner_id = owner_id
        self.package_type_id = package_type_id
        self.name = name
        self.package = package
        self.is_active = is_active
        self.created_at = created_at
        self.is_for_individual_students = is_for_individual_students
