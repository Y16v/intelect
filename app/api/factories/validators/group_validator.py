from api.factories.repositories.group import GroupRepoFactory
from api.validators.group_validator import GroupValidator


class GroupValidatorFactory:
    @staticmethod
    def create():
        group_repo = GroupRepoFactory.create()

        return GroupValidator(
            group_repo=group_repo
        )
