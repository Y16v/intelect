from api.models import GameORM, UserORM
from api.models.constants import Game
from django.core.paginator import Paginator, EmptyPage
from django.db import models


class ResultArchiveORM(models.Model):
    game = models.ForeignKey(GameORM, on_delete=models.CASCADE, default=Game.AFTERBURNER.id)
    student = models.ForeignKey(UserORM, on_delete=models.SET_NULL,  null=True)
    submit_at = models.DateTimeField()
    right_answers = models.PositiveSmallIntegerField()
    total_tasks = models.PositiveSmallIntegerField()
    total_points = models.FloatField()

    payload = models.TextField()

    @staticmethod
    def filter_with_pagination(page: int, count: int, **kwargs) -> (list, int):
        queryset = ResultArchiveORM.objects.filter(**kwargs)

        try:
            paginator = Paginator(queryset, count)
            return paginator.page(page).object_list, paginator.count

        except EmptyPage:
            return [], 0
