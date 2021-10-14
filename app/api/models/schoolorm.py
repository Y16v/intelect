from django.core.paginator import Paginator, EmptyPage
from django.db import models

from api.models.constants import SCHOOL_NAME_MAX_LENGTH


class SchoolORM(models.Model):
    owner = models.OneToOneField('api.UserORM', on_delete=models.CASCADE)
    package_type = models.ForeignKey('api.PackageTypeORM', null=True, blank=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=SCHOOL_NAME_MAX_LENGTH, unique=True)
    package = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_for_individual_students = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    @staticmethod
    def filter_with_pagination(page, count, **kwargs):
        schools = SchoolORM.objects.filter(**kwargs)

        try:
            paginator = Paginator(schools, count)
            return paginator.page(page).object_list, paginator.count
        except EmptyPage:
            return [], 0
