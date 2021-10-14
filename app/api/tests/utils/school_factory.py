from api.tests.utils.common import is_jsonable
from django.utils import timezone
import factory
from django.db.models.signals import post_save

from api.models import SchoolORM


@factory.django.mute_signals(post_save)
class TestSchoolFactory(factory.DjangoModelFactory):
    class Meta:
        model = SchoolORM

    owner = factory.SubFactory('api.tests.utils.user_factory.TestUserFactory', school=None)
    package_type = factory.SubFactory('api.tests.utils.package_type_factory.TestPackageTypeFactory')
    name = factory.Sequence(lambda n: 'example name{0}'.format(n))
    package = 100
    is_active = True
    created_at = timezone.now()

    @staticmethod
    def create_many(count: int = 4):
        schools = []
        for i in range(count):
            schools.append(
                TestSchoolFactory()
            )

        return schools

    @staticmethod
    def get_test_data(*args, **kwargs) -> dict:
        user = TestSchoolFactory(*args, **kwargs)
        user.delete()

        data = {}
        for key, value in user.__dict__.items():
            if is_jsonable(value):
                data[key] = value

        return data
