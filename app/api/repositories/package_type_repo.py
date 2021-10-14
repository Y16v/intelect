from api.exceptions.exeptions import EntityDoesNotExistException
from api.models import PackageTypeORM


class PackageTypeRepo:
    def __init__(self, package_type_entity):
        self.package_type_entity = package_type_entity
        self.orm = PackageTypeORM

    def _wrap_queryset_to_entity_list(self, queryset):
        data = []
        for package_type in queryset:
            data.append(
                self.package_type_entity.create(**package_type.__dict__)
            )

        return data

    def get_by_id(self, package_type_id):
        try:
            package_type = self.orm.objects.get(id=package_type_id)
        except self.orm.DoesNotExist:
            raise EntityDoesNotExistException()

        return self.package_type_entity.create(**package_type.__dict__)

    def get_by_school_id(self, school_id):
        try:
            package_type = self.orm.objects.get(schoolorm__id=school_id)
        except self.orm.DoesNotExist:
            return None

        return self.package_type_entity.create(**package_type.__dict__)

    def get_individual_students_package_types(self):
        package_types = self.orm.objects.filter(is_for_individual_students=True)

        return self._wrap_queryset_to_entity_list(package_types)

    def get_school_package_types(self):
        package_types = self.orm.objects.filter(is_for_individual_students=False)
        return self._wrap_queryset_to_entity_list(package_types)

