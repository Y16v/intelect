from api.factories.entities.group import GroupEntityFactory
from api.repositories.group_repo import GroupRepo


class GroupRepoFactory:
    @staticmethod
    def create():
        group_entity = GroupEntityFactory.create()

        return GroupRepo(
            group_entity=group_entity
        )
