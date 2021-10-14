from django.db import models

from api.models.constants import GAME_NAME_MAX_LENGTH, GAME_CODE_MAX_LENGTH


class GameORM(models.Model):
    name = models.CharField(max_length=GAME_NAME_MAX_LENGTH)
    code = models.CharField(max_length=GAME_CODE_MAX_LENGTH, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.name
