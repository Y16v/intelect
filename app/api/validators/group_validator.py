from api.exceptions.exeptions import ValidationException
from api.models.constants import GROUP_NAME_MIN_LENGTH


class GroupValidator:
    GROUP_NAME_MIN_LENGTH_ERROR_MESSAGE = f'group.name.shouldHaveMin{GROUP_NAME_MIN_LENGTH}Length'

    def __init__(self, group_repo):
        self.group_repo = group_repo

    def name_has_valid_length(self, name):
        if len(name) < GROUP_NAME_MIN_LENGTH:
            raise ValidationException(self.GROUP_NAME_MIN_LENGTH_ERROR_MESSAGE)

        return True
