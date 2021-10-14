from api.tests.utils.common import is_jsonable
from django.utils import timezone
import factory
from django.db.models.signals import post_save

from api.models import UserORM, UserCategoryORM
from api.models.constants import UserCategory

user_categories = UserCategoryORM.objects.all()


@factory.django.mute_signals(post_save)
class TestUserFactory(factory.DjangoModelFactory):
    class Meta:
        model = UserORM

    category = user_categories.get(name=UserCategory.STUDENT)
    school = None
    teacher = None

    username = factory.Sequence(lambda n: 'example_username{0}'.format(n))
    student_password = 'example_password'
    password = factory.PostGenerationMethodCall('set_password', student_password)
    phone = factory.Sequence(lambda n: '+99677958378{0}'.format(n))
    email = factory.Sequence(lambda n: 'example{0}@email.com'.format(n))

    first_name = 'Example first name'
    last_name = 'Example last name'
    is_active = True
    start_validity_date = timezone.now()

    @staticmethod
    def create_super_user(*args, **kwargs):
        superuser_category = user_categories.get(name=UserCategory.SUPER_ADMIN)
        return TestUserFactory(is_superuser=True, is_staff=True, category=superuser_category, *args, **kwargs)

    @staticmethod
    def create_school_admin(*args, **kwargs):
        school_admin_category = user_categories.get(name=UserCategory.SCHOOL_ADMIN)
        return TestUserFactory(category=school_admin_category, *args, **kwargs)

    @staticmethod
    def create_teacher(school_id: int, *args, **kwargs):
        teacher_user_category = user_categories.get(name=UserCategory.TEACHER)
        return TestUserFactory(school_id=school_id, category=teacher_user_category, *args, **kwargs)

    @staticmethod
    def get_test_data(*args, **kwargs) -> dict:
        user = TestUserFactory(*args, **kwargs)
        user.delete()

        data = {}
        for key, value in user.__dict__.items():
            if is_jsonable(value):
                data[key] = value

        return data

    @staticmethod
    def create_many_teachers(school_id: int, count: int = 4, *args, **kwargs):
        teachers = []
        teacher_user_category = user_categories.get(name=UserCategory.TEACHER)

        for _ in range(count):
            teachers.append(
                TestUserFactory(category_id=teacher_user_category.id, school_id=school_id)
            )

        return teachers

    @staticmethod
    def create_many_students(school_id: int, teacher_id: int = None, count: int = 4, *args, **kwargs):
        student_user_category = user_categories.get(name=UserCategory.STUDENT)

        students = []
        for _ in range(count):
            students.append(
                TestUserFactory(category_id=student_user_category.id, school_id=school_id, teacher_id=teacher_id, *args, **kwargs)
            )

        return students

