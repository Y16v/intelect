import pytz
from api.exceptions.exeptions import EntityDoesNotExistException, RESULT_NOT_FOUND
from api.models.constants import DATE_FORMAT
from api.models.resultorm import ResultORM, ResultItemORM
from django.db.models import Sum
from django.utils import timezone


class ResultRepo:

    def __init__(self, result_entity):
        self.result_entity = result_entity
        self.orm = ResultORM

    def all(self) -> list:
        queryset = self.orm.objects.all()
        return [self.result_entity.create(**result_orm.__dict__) for result_orm in queryset]

    def create(self, result):
        result_orm = self.orm.objects.create(**result.__dict__)
        return self.result_entity.create(**result_orm.__dict__)

    def get_by_id(self, id):
        try:
            result_orm = self.orm.objects.get(id=id)
            return self.result_entity.create(**result_orm.__dict__)
        except self.orm.DoesNotExist:
            raise EntityDoesNotExistException(RESULT_NOT_FOUND)

    def filter_student_results_by_date_range(self, student_id,  start_date, end_date):
        result_orms = self.orm.objects.filter(student_id=student_id, submit_at__gte=start_date, submit_at__lte=end_date)
        results = [self.result_entity.create(**result_orm.__dict__) for result_orm in result_orms]

        return results

    def get_list_by_student(self, student_id, page):
        result_orms, total = self.orm.get_with_paginate(student_id, page)
        results = [self.result_entity.create(**result_orm.__dict__) for result_orm in result_orms]

        return results, total

    def delete_all(self):
        self.orm.objects.all().delete()
        return True

    def delete_by_student_id(self, student_id):
        self.orm.objects.filter(student_id=student_id).delete()

    def filter_by_student_ids_in_and_submit_date(self, student_ids: [int], date):
        tz = timezone.get_current_timezone()
        tz = tz.__str__()
        date = timezone.datetime.strptime(date, DATE_FORMAT)
        end_day = date + timezone.timedelta(days=1)
        date = pytz.timezone(tz).localize(date, is_dst=None)
        end_day = pytz.timezone(tz).localize(end_day, is_dst=None)

        results = self.orm.objects.filter(student_id__in=student_ids,
                                          submit_at__gte=date,
                                          submit_at__lte=end_day
                                          )
        return [self.result_entity.create(**result.__dict__) for result in results]

    def get_student_results_date_ranges(self, student_id: int):
        smallest_date = self.orm.objects.values_list(
            'submit_at',
            flat=True).filter(student_id=student_id).order_by('submit_at').first()

        largest_date = self.orm.objects.values_list(
            'submit_at',
            flat=True).filter(student_id=student_id).order_by('-submit_at').first()

        return smallest_date, largest_date


class ResultItemRepo:
    def __init__(self, result_item_entity):
        self.result_item_entity = result_item_entity
        self.orm = ResultItemORM

    def get_by_id(self, id):
        try:
            result_orm = self.orm.objects.get(id=id)
            return self.result_item_entity.create(**result_orm.__dict__)
        except self.orm.DoesNotExist:
            raise EntityDoesNotExistException(RESULT_NOT_FOUND)

    def get_list_by_result(self, result_id):
        result_item_orms = self.orm.objects.filter(result_id=result_id)
        return [self.result_item_entity.create(**result_item_orm.__dict__) for result_item_orm in result_item_orms]

    def create(self, result):
        result_item_orm = self.orm.objects.create(**result.__dict__)
        return self.result_item_entity.create(**result_item_orm.__dict__)

    def create_list(self, result_items):
        result_item_orms = [self.orm(**result_item.__dict__) for result_item in result_items]
        result_item_orms = self.orm.objects.bulk_create(result_item_orms)
        return [self.result_item_entity.create(**result_item_orm.__dict__) for result_item_orm in result_item_orms]

    def get_total(self, result_id):
        return self.orm.objects.filter(result_id=result_id).count()

    def get_right_total(self, result_id):
        return self.orm.get_right_total(result_id).count()

    def get_all_right_total(self, user_id):
        return self.orm.get_all_right_total(user_id)

    def get_student_total_points(self, student_id):
        items = self.orm.objects.filter(result__student_id=student_id)
        total_points = sum([item.points or 0 for item in items])
        return total_points

    def get_all_total(self, user_id):
        return self.orm.get_all_total(user_id)

    def delete_all(self):
        self.orm.objects.all().delete()
        return True

    def delete_by_student_id(self, student_id):
        self.orm.objects.filter(result__student_id=student_id).delete()

    def get_result_total_points(self, result_id):
        points_avg = self.orm.objects.filter(result_id=result_id).aggregate(Sum('points'))
        return points_avg['points__sum'] or 0
