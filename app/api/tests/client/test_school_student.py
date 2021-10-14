from api.models import UserCategoryORM
from api.models.constants import UserCategory
from api.tests.utils.common import CustomTestCase

from api.factories.services.auth_service import AuthServiceFactory
from api.status_code import StatusCode
from api.tests.utils.school_factory import TestSchoolFactory
from api.tests.utils.user_factory import TestUserFactory
from api.exceptions import messages as exc_messages
from api.validators.user_permission_validator import UserPermissionValidator
from api.validators.user_validator import UserValidator


class SchoolStudentAPITest(CustomTestCase):
    def setUp(self) -> None:
        self.student_user_category = UserCategoryORM.objects.get(name=UserCategory.STUDENT)
        self.teacher_user_category = UserCategoryORM.objects.get(name=UserCategory.TEACHER)

    def test_should_return_school_students_to_school_owner(self):
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        students = TestUserFactory.create_many_students(school_id=school.id)

        url = f'/api/schools/{school.id}/students'
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.get(url, **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.OK)
        for i in range(len(body)):
            self.is_equal_user_dicts(body[i], students[i].__dict__)

    def test_should_let_superuser_to_get_school_students(self):
        superuser = TestUserFactory.create_super_user()
        token = AuthServiceFactory().create().create_auth_token(superuser.id)
        school = TestSchoolFactory()
        students = TestUserFactory.create_many_students(school_id=school.id)

        url = f'/api/schools/{school.id}/students'
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.get(url, **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.OK)
        for i in range(len(body)):
            self.is_equal_user_dicts(body[i], students[i].__dict__)

    def test_should_return_teacher_students_with_teacher_pk_kwarg(self):
        school_admin = TestUserFactory.create_school_admin()
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()
        teacher = TestUserFactory()
        teacher_students = TestUserFactory.create_many_students(school_id=school.id, teacher_id=teacher.id)
        _other_students = TestUserFactory.create_many_students(school_id=school.id)

        url = f'/api/schools/{school.id}/students?teacher_pk={teacher.id}'
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.get(url, **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.OK)
        for i in range(len(body)):
            self.is_equal_user_dicts(body[i], teacher_students[i].__dict__)

    def test_get_school_students_should_return_not_found_if_school_does_not_exist(self):
        school_admin = TestUserFactory.create_school_admin()
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        does_not_exist_school_id = 12345678

        url = f'/api/schools/{does_not_exist_school_id}/students'
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.get(url, **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.NOT_FOUND)
        self.assertEqual(body['error'], exc_messages.SCHOOL_NOT_FOUND)

    def test_should_return_unauthorized_if_token_is_incorrect(self):
        school = TestSchoolFactory()

        url = f'/api/schools/{school.id}/students'
        headers = {'HTTP_AUTHORIZATION': 'incorrect_token'}

        response = self.client.get(url, **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.UNAUTHORIZED)
        self.assertEqual(body['error'], exc_messages.AUTH_REQUIRED)

    def test_should_return_forbidden_if_user_is_not_owner_of_school_or_superuser(self):
        school = TestSchoolFactory()
        another_user = TestUserFactory.create_school_admin()
        token = AuthServiceFactory().create().create_auth_token(another_user.id)

        url = f'/api/schools/{school.id}/students'
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.get(url, **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.FORBIDDEN)
        self.assertEqual(body['error'], exc_messages.USER_PERMISSION_DENIED)

    def test_should_let_only_school_owner_to_create_academic(self):
        school_admin = TestUserFactory.create_school_admin()
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()

        url = f'/api/schools/{school.id}/students'
        headers = {'HTTP_AUTHORIZATION': token.token}
        new_academic_data = TestUserFactory.get_test_data()
        data = {
            'category': UserCategory.TEACHER,  # or _student
            'teacher_id': None,
            'student_data': {
                'username': new_academic_data['username'],
                'email': new_academic_data['email'],
                'phone': new_academic_data['phone'],
                'first_name': new_academic_data['first_name'],
                'last_name': new_academic_data['last_name']
            }
        }

        response = self.client.post(url, data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.CREATED)
        self.assertEqual(body['category_id'], self.teacher_user_category.id)  # or student
        self.assertEqual(body['school_id'], school.id)
        self.assertEqual(body['teacher_id'], new_academic_data['teacher_id'])
        self.assertEqual(body['username'], new_academic_data['username'])
        self.assertEqual(body['email'], new_academic_data['email'])
        self.assertEqual(body['phone'], new_academic_data['phone'])

    def test_should_return_not_found_if_school_does_not_exist(self):
        school_admin = TestUserFactory.create_school_admin()
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)

        does_not_exist_school_id = 12345678
        url = f'/api/schools/{does_not_exist_school_id}/students'
        headers = {'HTTP_AUTHORIZATION': token.token}
        new_academic_data = TestUserFactory.get_test_data()
        data = {
            'category': UserCategory.TEACHER,  # or _student
            'teacher_id': None,
            'student_data': {
                'username': new_academic_data['username'],
                'email': new_academic_data['email'],
                'phone': new_academic_data['phone'],
                'first_name': new_academic_data['first_name'],
                'last_name': new_academic_data['last_name']
            }
        }

        response = self.client.post(url, data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.FORBIDDEN)
        self.assertEqual(body['error'], UserPermissionValidator.USER_MUST_BE_SUPERUSER_OR_OWNER_OF_SCHOOL)

    def test_should_return_error_if_provided_category_is_not_academics(self):
        school_admin = TestUserFactory.create_school_admin()
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()

        url = f'/api/schools/{school.id}/students'
        headers = {'HTTP_AUTHORIZATION': token.token}
        new_academic_data = TestUserFactory.get_test_data()
        data = {
            'category': UserCategory.SCHOOL_ADMIN,  # or SUPER_ADMIN
            'teacher_id': None,
            'student_data': {
                'username': new_academic_data['username'],
                'email': new_academic_data['email'],
                'phone': new_academic_data['phone'],
                'first_name': new_academic_data['first_name'],
                'last_name': new_academic_data['last_name']
            }
        }

        response = self.client.post(url, data, content_type='application/json', **headers)

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)

    def test_create_academic_should_return_error_if_user_exist_with_provided_username(self):
        school_admin = TestUserFactory.create_school_admin()
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()

        url = f'/api/schools/{school.id}/students'
        headers = {'HTTP_AUTHORIZATION': token.token}
        exist_academic = TestUserFactory()
        new_academic_data = TestUserFactory.get_test_data()
        data = {
            'category': UserCategory.TEACHER,  # or _student
            'teacher_id': None,
            'student_data': {
                'username': exist_academic.username,
                'email': new_academic_data['email'],
                'phone': new_academic_data['phone'],
                'first_name': new_academic_data['first_name'],
                'last_name': new_academic_data['last_name']
            }
        }

        response = self.client.post(url, data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], exc_messages.get_user_unique_field_error('username'))

    def test_create_academic_should_return_bad_request_if_phone_payload_is_invalid(self):
        pass

    def test_create_academic_should_return_error_if_user_exist_with_provided_phone(self):
        school_admin = TestUserFactory.create_school_admin()
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()

        url = f'/api/schools/{school.id}/students'
        headers = {'HTTP_AUTHORIZATION': token.token}
        exist_academic = TestUserFactory()
        new_academic_data = TestUserFactory.get_test_data()
        data = {
            'category': UserCategory.TEACHER,  # or _student
            'teacher_id': None,
            'student_data': {
                'phone': exist_academic.phone,
                'username': new_academic_data['username'],
                'email': new_academic_data['email'],
                'first_name': new_academic_data['first_name'],
                'last_name': new_academic_data['last_name']
            }
        }

        response = self.client.post(url, data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], exc_messages.get_user_unique_field_error('phone'))

    def test_create_academic_should_return_bad_request_if_email_payload_is_invalid(self):
        school_admin = TestUserFactory.create_school_admin()
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()
        new_academic_data = TestUserFactory.get_test_data()
        invalid_email = "invalid_email"

        url = f'/api/schools/{school.id}/students'
        headers = {'HTTP_AUTHORIZATION': token.token}
        data = {
            'category': UserCategory.TEACHER,  # or _student
            'teacher_id': None,
            'student_data': {
                **new_academic_data,
                "email": invalid_email
            }
        }

        response = self.client.post(url, data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], UserValidator.EMAIL_IS_NOT_VALID )

    def test_create_academic_should_return_error_if_user_exist_with_provided_email(self):
        school_admin = TestUserFactory.create_school_admin()
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()

        url = f'/api/schools/{school.id}/students'
        headers = {'HTTP_AUTHORIZATION': token.token}
        exist_academic = TestUserFactory()
        new_academic_data = TestUserFactory.get_test_data()
        data = {
            'category': UserCategory.TEACHER,  # or _student
            'teacher_id': None,
            'student_data': {
                'email': exist_academic.email,
                'phone': new_academic_data['phone'],
                'username': new_academic_data['username'],
                'first_name': new_academic_data['first_name'],
                'last_name': new_academic_data['last_name']
            }
        }

        response = self.client.post(url, data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], exc_messages.get_user_unique_field_error('email'))

    def test_create_academic_should_return_unauthorized_if_token_is_incorrect(self):
        school = TestSchoolFactory()

        url = f'/api/schools/{school.id}/students'
        headers = {'HTTP_AUTHORIZATION': 'incorrect_token'}
        new_academic_data = TestUserFactory.get_test_data()
        data = {
            'category': UserCategory.TEACHER,  # or _student
            'teacher_id': None,
            'student_data': {
                'username': new_academic_data['username'],
                'email': new_academic_data['email'],
                'phone': new_academic_data['phone'],
                'first_name': new_academic_data['first_name'],
                'last_name': new_academic_data['last_name']
            }
        }

        response = self.client.post(url, data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.UNAUTHORIZED)
        self.assertEqual(body['error'], exc_messages.AUTH_REQUIRED)

    def test_should_return_forbidden_error_if_user_not_school_owner(self):
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()
        another_user = TestUserFactory.create_school_admin()
        token = AuthServiceFactory().create().create_auth_token(another_user.id)

        url = f'/api/schools/{school.id}/students'
        headers = {'HTTP_AUTHORIZATION': token.token}
        new_academic_data = TestUserFactory.get_test_data()
        data = {
            'category': UserCategory.TEACHER,  # or _student
            'teacher_id': None,
            'student_data': {
                'username': new_academic_data['username'],
                'email': new_academic_data['email'],
                'phone': new_academic_data['phone'],
                'first_name': new_academic_data['first_name'],
                'last_name': new_academic_data['last_name']
            }
        }

        response = self.client.post(url, data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.FORBIDDEN)
        self.assertEqual(body['error'], UserPermissionValidator.USER_MUST_BE_SUPERUSER_OR_OWNER_OF_SCHOOL)




