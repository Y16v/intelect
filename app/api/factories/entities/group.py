from api.entities.group import Group


class GroupEntity:
    @staticmethod
    def create(id, name, teacher_id, *args, **kwargs):
        return Group(
            id=id,
            name=name,
            teacher_id=teacher_id
        )


class GroupEntityFactory:
    @staticmethod
    def create():
        return GroupEntity
