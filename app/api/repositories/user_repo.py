from api.exceptions.exeptions import EntityDoesNotExistException, USER_NOT_FOUND, NoPermissionException, \
    PASSWORD_DON_NOT_MATCH
from api.models import UserORM
from api.models.constants import UserCategory


class UserRepo:

    def __init__(self, user_entity, result_repo):
        self.user_entity = user_entity
        self.result_repo = result_repo
        self.orm = UserORM

    def _wrap_queryset_to_entities(self, queryset):
        users = []
        for user in queryset:
            users.append(self.user_entity.create(**user.__dict__))

        return users

    def get_ordering_number(self, user):
        return self.orm.get_ordering_number(user.id)

    def get_by_id(self, id):
        try:
            user_orm = self.orm.objects.get(id=id)
            return self.user_entity.create(**user_orm.__dict__)
        except self.orm.DoesNotExist:
            raise EntityDoesNotExistException(USER_NOT_FOUND)

    def get_by_user_id_and_school_id(self, user_id, school_id):
        try:
            user_orm = self.orm.objects.get(id=user_id, school_id=school_id)
        except self.orm.DoesNotExist:
            raise EntityDoesNotExistException(USER_NOT_FOUND)
        else:
            return self.user_entity.create(**user_orm.__dict__)

    def get_by_username(self, username):
        try:
            user_orm = self.orm.objects.get(username=username)
            return self.user_entity.create(**user_orm.__dict__)
        except self.orm.DoesNotExist:
            raise EntityDoesNotExistException(USER_NOT_FOUND)

    def get_by_phone(self, phone):
        try:
            user_orm = self.orm.objects.get(phone=phone)
            return self.user_entity.create(**user_orm.__dict__)
        except self.orm.DoesNotExist:
            raise EntityDoesNotExistException(USER_NOT_FOUND)

    def get_by_email(self, email):
        try:
            user_orm = self.orm.objects.get(email=email)
            return self.user_entity.create(**user_orm.__dict__)
        except self.orm.DoesNotExist:
            raise EntityDoesNotExistException(USER_NOT_FOUND)

    def filter(self, *args, **kwargs):
        users = self.orm.order_by_rating().filter(*args, **kwargs)

        return self._wrap_queryset_to_entities(users)

    def get_by_username(self, username):
        try:
            user_orm = self.orm.objects.get(username=username)
            return self.user_entity.create(**user_orm.__dict__)
        except self.orm.DoesNotExist:
            raise EntityDoesNotExistException(USER_NOT_FOUND)

    def get_by_school_id(self, school_id):
        users = self.orm.order_by_rating().filter(school_id=school_id)
        return self._wrap_queryset_to_entities(users)

    def get_teachers_by_school(self, school_id):
        teaches = self.orm.objects.filter(school_id=school_id, category__name=UserCategory.TEACHER)
        return teaches

    def get_students_by_school(self, school_id):
        teaches = self.orm.order_by_rating().filter(school_id=school_id, category__name=UserCategory.STUDENT)
        return self._wrap_queryset_to_entities(teaches)

    def get_all_students(self, page):
        studentorms = self.orm.get_with_paginate(page, category__name=UserCategory.STUDENT)
        return self._wrap_queryset_to_entities(studentorms)

    def check_password(self, user, password):
        db_user = UserORM.objects.get(id=user.id)
        if not db_user.check_password(password):
            raise NoPermissionException(PASSWORD_DON_NOT_MATCH)

    def get(self, *args, **kwargs):
        try:
            user_orm = self.orm.objects.get(*args, **kwargs)
            return self.user_entity.create(**user_orm.__dict__)
        except self.orm.DoesNotExist:
            raise EntityDoesNotExistException(USER_NOT_FOUND)

    def create(self, user):
        user_orm = UserORM.objects.create_user(
            **user.__dict__
        )
        return self.user_entity.create(**user_orm.__dict__)

    def create_random_password(self):
        return UserORM.objects.make_random_password()

    def delete_by_id(self, id):
        self.orm.objects.filter(pk=id).delete()

    def update(self, user):
        user_orm = self.orm.objects.filter(id=user.id)
        user_orm.update(**user.__dict__)

        return self.user_entity.create(**user.__dict__)

    def set_password(self, user_id, password):
        user = self.orm.objects.get(id=user_id)
        user.student_password = password
        user.set_password(password)
        user.save()

        return self.user_entity.create(**user.__dict__)

    def search_students_by_first_name_and_last_name_including_filters_and_pagination(self,
                                                                                     q,
                                                                                     school_id=None,
                                                                                     teacher_id=None,
                                                                                     group_id=None,
                                                                                     played_at=None,
                                                                                     page=1,
                                                                                     count=10,
                                                                                     ):
        queryset = self.orm.order_by_rating().filter(category_id=UserCategory.STUDENT_CATEGORY_ID)

        if school_id:
            queryset = queryset.filter(school_id=school_id)

        if teacher_id:
            queryset = queryset.filter(teacher_id=teacher_id)

        if group_id == '__empty__':
            queryset = queryset.filter(group_id=None)

        elif group_id:
            queryset = queryset.filter(group_id=group_id)

        if played_at:
            student_ids = [student.id for student in queryset]
            results = self.result_repo.filter_by_student_ids_in_and_submit_date(student_ids, played_at)
            student_ids = [result.student_id for result in results]

            queryset = queryset.filter(id__in=student_ids)

        queryset, total = self.orm.search_in_queryset_by_name_or_surname_with_pagination(queryset, q, page, count)

        return self._wrap_queryset_to_entities(queryset), total

    def filter_students_by_group(self, group_id):
        students = self.orm.objects.filter(category_id=UserCategory.STUDENT_CATEGORY_ID, group_id=group_id)

        return self._wrap_queryset_to_entities(students)

    def delete(self, user_id):
        self.orm.objects.filter(id=user_id).delete()