from api.entities.school import School


class SchoolEntity:
    @staticmethod
    def create(
            id,
            owner_id,
            name,
            package,
            is_active,
            created_at,
            package_type_id=None,
            is_for_individual_students=False,
            *args,
            **kwargs
    ):
        return School(
            id=id,
            owner_id=owner_id,
            name=name,
            package=package,
            is_active=is_active,
            created_at=created_at,
            package_type_id=package_type_id,
            is_for_individual_students=is_for_individual_students
        )


class SchoolEntityFactory:
    @staticmethod
    def create():
        return SchoolEntity
