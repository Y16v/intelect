from api.models.schoolorm import SchoolORM
from api.exceptions.exeptions import EntityDoesNotExistException
from api.exceptions.messages import SCHOOL_NOT_FOUND


class SchoolRepo:
    def __init__(self, school_entity):
        self.school_entity = school_entity

        self.orm = SchoolORM

    def wrap_queryset_to_entities(self, queryset):
        data = []
        for school in queryset:
            data.append(self.school_entity.create(**school.__dict__))

        return data

    def get_by_id(self, id):
        try:
            user_orm = self.orm.objects.get(id=id)
            return self.school_entity.create(**user_orm.__dict__)
        except self.orm.DoesNotExist:
            raise EntityDoesNotExistException(SCHOOL_NOT_FOUND)

    def get_by_name(self, name):
        try:
            user_orm = self.orm.objects.get(name=name)
            return self.school_entity.create(**user_orm.__dict__)
        except self.orm.DoesNotExist:
            raise EntityDoesNotExistException(SCHOOL_NOT_FOUND)

    def get_by_owner_id(self, owner_id):
        try:
            user_orm = self.orm.objects.get(owner_id=owner_id)
            return self.school_entity.create(**user_orm.__dict__)
        except self.orm.DoesNotExist:
            raise EntityDoesNotExistException(SCHOOL_NOT_FOUND)

    def delete_by_id(self, id):
        self.orm.objects.filter(pk=id).delete()

        return True

    def all_with_pagination(self, page, count):
        queryset, total = self.orm.filter_with_pagination(page=page, count=count)

        return self.wrap_queryset_to_entities(queryset), total

    def all(self):
        queryset = self.orm.objects.all()

        return self.wrap_queryset_to_entities(queryset)

    def create(self, school):
        school = self.orm.objects.create(**school.__dict__)
        return school

    def update(self, school):
        school_orm = self.orm.objects.filter(id=school.id)
        school_orm.update(**school.__dict__)

        return self.school_entity.create(**school.__dict__)

    def filter(self, *args, **kwargs):
        schools = self.orm.objects.filter(*args, **kwargs)

        return self.wrap_queryset_to_entities(schools)

    def search_school_by_name_with_pagination(self, q, page, count):
        schools, total = self.orm.filter_with_pagination(name__contains=q, page=page, count=count)

        return self.wrap_queryset_to_entities(schools), total
