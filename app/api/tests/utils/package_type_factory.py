import factory
from django.db.models.signals import post_save

from api.models.package_type_orm import PackageTypeORM
from api.tests.utils.common import is_jsonable


@factory.django.mute_signals(post_save)
class TestPackageTypeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = PackageTypeORM

    price = 1234567
    item_month_duration = 6
    accounts_quantity = 100
    is_for_individual_students = False
