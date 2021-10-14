from api.entities.archives import ResultArchive
from api.factories.entities.archives import ResultArchiveEntity
from api.models.archives import ResultArchiveORM


class ResultArchiveRepo:
    def __init__(self, result_archive_entity: ResultArchiveEntity):
        self.result_archive_entity = result_archive_entity
        self.orm = ResultArchiveORM

    def _wrap_queryset_to_entities(self, queryset):
        return [self.result_archive_entity.create(**result_archive.__dict__) for result_archive in queryset]

    def create(self, result_archive: ResultArchive):
        result_archive_orm = self.orm.objects.create(**result_archive.__dict__)
        return self.result_archive_entity.create(**result_archive_orm.__dict__)

    def filter_by_student_id(self, student_id):
        queryset = self.orm.objects.filter(student_id=student_id)

        archives = self._wrap_queryset_to_entities(queryset)

        return archives, len(archives)

    def filter_by_student_id_with_pagination(self, student_id, page, count):
        queryset, total = self.orm.filter_with_pagination(page, count, student_id=student_id)

        return self._wrap_queryset_to_entities(queryset), total

    def get_student_archives_available_date_range(self, student_id):
        smallest_date = self.orm.objects.values_list(
            'submit_at',
            flat=True).filter(student_id=student_id).order_by('submit_at').first()

        largest_date = self.orm.objects.values_list(
            'submit_at',
            flat=True).filter(student_id=student_id).order_by('-submit_at').first()

        return smallest_date, largest_date

    def filter_student_archives_by_date_range(self, student_id: int, start_date, end_date):
        archives = self.orm.objects.filter(student_id=student_id, submit_at__gte=start_date, submit_at__lte=end_date)
        return self._wrap_queryset_to_entities(archives)
