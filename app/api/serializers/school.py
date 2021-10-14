from api.serializers.package_type_serializer import PackageTypeSerializer
from api.serializers.utils import AttributeUtility


class SchoolSerializer:
    @staticmethod
    def serialize(school):
        school = AttributeUtility(school)
        return {
            "id": school.id,
            "owner_id": school.owner_id,
            "package_type_id": school.package_type_id,
            "name": school.name,
            "package": school.package,
            "is_active": school.is_active,
            "created_at": school.created_at,
            "is_for_individual_students": school.is_for_individual_students,
            "package_type": school.package_type and PackageTypeSerializer.serialize(school.package_type)
        }

    @staticmethod
    def list_serialize(schools):
        data = []
        for school in schools:
            data.append(
                SchoolSerializer.serialize(school)
            )

        return data
