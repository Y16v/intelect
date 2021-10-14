from api.models.constants import PHONE_LENGTH, NAME_LENGTH, UserCategory, STUDENT_PASSWORD_LENGTH, COUNT_STUDENTS_PAGE
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.paginator import Paginator, EmptyPage
from django.db import models
from django.db.models import Q

USER_CATEGORY_CHOICES = (
    (UserCategory.SUPER_ADMIN, UserCategory.SUPER_ADMIN),
    (UserCategory.SCHOOL_ADMIN, UserCategory.SCHOOL_ADMIN),
    (UserCategory.TEACHER, UserCategory.TEACHER),
    (UserCategory.STUDENT, UserCategory.STUDENT),

)


class UserCategoryORM(models.Model):
    name = models.CharField(choices=USER_CATEGORY_CHOICES, max_length=NAME_LENGTH)

    def __str__(self):
        return self.name


class GroupORM(models.Model):
    teacher = models.ForeignKey('api.UserORM', on_delete=models.PROTECT)
    name = models.CharField(max_length=NAME_LENGTH)

    def __str__(self):
        return self.name


class UserManager(BaseUserManager):
    def create_superuser(self, username, phone, password=None, **extra_fields):
        if not username:
            raise ValueError("User must have an email")

        if not phone:
            raise ValueError("User must have phone")

        if not password:
            raise ValueError("User must have a password")

        user = self.model(
            username=username,
            category=self._get_admin_user_category()
        )
        user.set_password(password)
        user.is_staff = True
        user.is_active = True
        user.is_superuser = True
        user.phone = phone
        user.save(using=self._db)
        return user

    def create_user(self, email, password, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def _get_admin_user_category(self):
        user_category = UserCategoryORM.objects.get(name=UserCategory.SUPER_ADMIN)
        return user_category


class UserORM(AbstractUser):
    objects = UserManager()
    category = models.ForeignKey(UserCategoryORM, on_delete=None)
    school = models.ForeignKey('api.SchoolORM', null=True, on_delete=None, blank=True)
    teacher = models.ForeignKey('self', null=True, on_delete=None, blank=True)
    group = models.ForeignKey('api.GroupORM', null=True, blank=True, on_delete=models.SET_NULL)
    phone = models.CharField(max_length=PHONE_LENGTH, null=True)
    email = models.EmailField(null=True, blank=True)
    first_name = models.CharField(max_length=NAME_LENGTH, blank=True)
    last_name = models.CharField(max_length=NAME_LENGTH, blank=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    student_password = models.CharField(max_length=STUDENT_PASSWORD_LENGTH, default=None, null=True)
    start_validity_date = models.DateTimeField(null=True, blank=True)
    active_until = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['phone']

    class Meta:
        ordering = ('-id', )

    @staticmethod
    def order_by_rating():
        return UserORM.objects.annotate(
            count=models.Sum(
                'resultorm__resultitemorm__points'
            )
        ).order_by('-count')

    @staticmethod
    def get_ordering_number(id):
        return list(UserORM.order_by_rating().filter(category_id=UserCategory.STUDENT_CATEGORY_ID).values_list('id', flat=True)).index(id)

    @staticmethod
    def get_with_paginate(page, *args, **kwargs):
        try:
            students = UserORM.order_by_rating().filter(*args, **kwargs)
            return Paginator(students, COUNT_STUDENTS_PAGE).page(page).object_list
        except EmptyPage:
            return []

    @staticmethod
    def search_in_queryset_by_name_or_surname_with_pagination(queryset, q, page, count):
        users = queryset.filter(Q(first_name__icontains=q) | Q(last_name__icontains=q))

        try:
            paginator = Paginator(users, count)
            return paginator.page(page).object_list, paginator.count
        except EmptyPage:
            return [], 0
