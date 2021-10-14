from api.exceptions.exeptions import EntityDoesNotExistException
from api.models.userorm import GroupORM


class GroupRepo:
    def __init__(self, group_entity):
        self.group_entity = group_entity
        self.orm = GroupORM

    def _wrap_queryset_to_entities(self, queryset):
        groups = []
        for user in queryset:
            groups.append(self.group_entity.create(**user.__dict__))

        return groups

    def filter_by_school_id(self, school_id):
        groups = self.orm.objects.filter(teacher__school_id=school_id)
        return self._wrap_queryset_to_entities(groups)

    def filter_by_school_id_and_teacher_id(self, school_id, teacher_id):
        groups = self.orm.objects.filter(teacher__school_id=school_id, teacher_id=teacher_id)
        return self._wrap_queryset_to_entities(groups)

    def create(self, group):
        group = self.orm.objects.create(**group.__dict__)

        return self.group_entity.create(**group.__dict__)

    def update(self, group):
        group_orm = self.orm.objects.filter(id=group.id)
        group_orm.update(**group.__dict__)

        return self.group_entity.create(**group.__dict__)

    def get_by_id(self, group_id):
        try:
            group = self.orm.objects.get(id=group_id)
        except self.orm.DoesNotExist:
            raise EntityDoesNotExistException()

        return self.group_entity.create(**group.__dict__)

    def get_by_school_id_and_group_id(self, school_id, group_id):
        try:
            group = self.orm.objects.get(teacher__school_id=school_id, id=group_id)
        except self.orm.DoesNotExist:
            raise EntityDoesNotExistException()

        return self.group_entity.create(**group.__dict__)

    def delete_by_id(self, group_id):
        self.orm.objects.filter(pk=group_id).delete()

