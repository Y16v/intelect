from api.models import UserORM, GameORM
from api.models.constants import COUNT_RESULT_PAGE, ACTION_TYPE_LENGTH_RESULT_ITEM, RESULT_MODULES_LENGTH, Game
from django.core.paginator import Paginator, EmptyPage
from django.db import models


class ResultORM(models.Model):
    game = models.ForeignKey(GameORM, on_delete=models.CASCADE, default=Game.AFTERBURNER.id)
    student = models.ForeignKey(UserORM, on_delete=models.CASCADE)
    submit_at = models.DateTimeField(auto_now_add=True)

    @staticmethod
    def get_with_paginate(student_id, page):
        try:
            queryset = ResultORM.objects.filter(student_id=student_id).order_by('-submit_at')
            paginator = Paginator(queryset, COUNT_RESULT_PAGE)
            selected_page = paginator.page(page)
            return selected_page.object_list, paginator.count
        except EmptyPage:
            return []


class ResultItemORM(models.Model):
    result = models.ForeignKey(ResultORM, on_delete=models.CASCADE)
    points = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
    answer = models.CharField(max_length=100, null=True, blank=True)
    exact = models.CharField(max_length=100, null=True, blank=True)
    digits = models.TextField(null=True)
    action_count = models.IntegerField(null=True)
    action_type = models.CharField(max_length=ACTION_TYPE_LENGTH_RESULT_ITEM, null=True)
    speed = models.FloatField(null=True)
    count_digits = models.IntegerField(null=True)
    count_digit_minus = models.IntegerField(null=True)
    modules = models.CharField(max_length=RESULT_MODULES_LENGTH, blank=True, null=True, default=None)
    modules_minus = models.CharField(max_length=RESULT_MODULES_LENGTH, blank=True, null=True, default=None)

    @staticmethod
    def get_right_total(result_id):
        return ResultItemORM.objects.filter(result_id=result_id, answer=models.F('exact'))

    @staticmethod
    def get_all_total(user_id):
        return ResultItemORM.objects.filter(result__student_id=user_id).count()

    @staticmethod
    def get_all_right_total(user_id):
        return ResultItemORM.objects.filter(result__student_id=user_id).aggregate(models.Sum('points'))['points__sum']