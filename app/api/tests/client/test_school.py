from api.models import UserCategoryORM
from api.models.constants import UserCategory
from api.tests.utils.common import CustomTestCase
from api.tests.utils.school_factory import TestSchoolFactory

from api.factories.services.auth_service import AuthServiceFactory
from api.status_code import StatusCode
from api.tests.utils.user_factory import TestUserFactory
from api.exceptions import messages as exc_messages
from api.validators.school_validator import SchoolValidator


class SchoolAPITest(CustomTestCase):
    def setUp(self) -> None:
        self.super_admin_category = UserCategoryORM.objects.get(name=UserCategory.SUPER_ADMIN)
        self.school_admin_category = UserCategoryORM.objects.get(name=UserCategory.SCHOOL_ADMIN)

    def test_should_return_all_schools(self):
        super_user = TestUserFactory.create_super_user()
        token = AuthServiceFactory().create().create_auth_token(super_user.id)
        schools = TestSchoolFactory.create_many()

        url = '/api/schools'
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.get(url, **headers, content_type='application/json')
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.OK)
        for i in range(len(schools)):
            self.is_equal_school_dists(schools[i].__dict__, body[i])

    def test_get_schools_should_return_forbidden_if_client_is_unauthorized(self):
        url = '/api/schools'
        headers = {'HTTP_AUTHORIZATION': 'incorrect_token'}

        response = self.client.get(url, **headers, content_type='application/json')
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.NOT_FOUND)
        self.assertEqual(body['error'], exc_messages.USER_NOT_FOUND)

    def test_get_schools_should_return_forbidden_if_user_is_not_superuser(self):
        not_superuser = TestUserFactory.create_school_admin()
        token = AuthServiceFactory().create().create_auth_token(not_superuser.id)

        url = '/api/schools'
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.get(url, **headers, content_type='application/json')
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.FORBIDDEN)
        self.assertEqual(body['error'], exc_messages.USER_PERMISSION_DENIED)

    def test_should_return_school_by_id_to_owner(self):
        school_admin = TestUserFactory.create_school_admin()
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        school = TestSchoolFactory(owner=school_admin)

        url = f'/api/schools/{school.id}'
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.get(url, **headers, content_type='application/json')
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.OK)
        self.is_equal_school_dists(school.__dict__, body)

    def test_should_return_school_to_super_admin(self):
        super_user = TestUserFactory.create_super_user()
        token = AuthServiceFactory().create().create_auth_token(super_user.id)
        school = TestSchoolFactory()

        url = f'/api/schools/{school.id}'
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.get(url, **headers, content_type='application/json')
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.OK)
        self.is_equal_school_dists(school.__dict__, body)

    def test_retrieve_school_should_return_forbidden_if_user_is_not_school_owner(self):
        not_owner_user = TestUserFactory.create_school_admin()
        token = AuthServiceFactory().create().create_auth_token(not_owner_user.id)
        school = TestSchoolFactory()

        url = f'/api/schools/{school.id}'
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.get(url, **headers, content_type='application/json')
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.FORBIDDEN)
        self.assertEqual(body['error'], exc_messages.USER_PERMISSION_DENIED)

    def test_retrieve_school_should_return_error_if_user_is_unauthorized(self):
        school = TestSchoolFactory()

        url = f'/api/schools/{school.id}'
        headers = {'HTTP_AUTHORIZATION': 'incorrect_token'}

        response = self.client.get(url, **headers, content_type='application/json')
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.NOT_FOUND)
        self.assertEqual(body['error'], exc_messages.USER_NOT_FOUND)

    def test_should_return_not_found_if_school_not_found(self):
        super_user = TestUserFactory.create_super_user()
        token = AuthServiceFactory().create().create_auth_token(super_user.id)
        not_exist_school_id = 123456789

        url = f'/api/schools/{not_exist_school_id}'
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.get(url, **headers, content_type='application/json')
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.NOT_FOUND)
        self.assertEqual(body['error'], exc_messages.SCHOOL_NOT_FOUND)

    def test_should_enable_superuser_to_edit_school_data(self):
        super_user = TestUserFactory.create_super_user()
        token = AuthServiceFactory().create().create_auth_token(super_user.id)
        school = TestSchoolFactory()

        url = f'/api/schools/{school.id}'
        headers = {'HTTP_AUTHORIZATION': token.token}
        new_data = TestSchoolFactory.get_test_data()

        response = self.client.put(url, new_data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.OK)
        self.assertEqual(body['name'], new_data['name'])
        self.assertEqual(body['is_active'], new_data['is_active'])

    def test_should_enable_owner_to_edit_school_data(self):
        school_admin = TestUserFactory.create_school_admin()
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()

        url = f'/api/schools/{school.id}'
        headers = {'HTTP_AUTHORIZATION': token.token}
        new_data = TestSchoolFactory.get_test_data()

        response = self.client.put(url, new_data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.OK)
        self.assertEqual(body['name'], new_data['name'])
        self.assertEqual(body['is_active'], new_data['is_active'])

    def test_should_return_error_if_school_exist_with_name(self):
        super_user = TestUserFactory.create_super_user()
        token = AuthServiceFactory().create().create_auth_token(super_user.id)
        school = TestSchoolFactory()
        another_exist_school = TestSchoolFactory()

        url = f'/api/schools/{school.id}'
        headers = {'HTTP_AUTHORIZATION': token.token}
        data = {
            'name': another_exist_school.name
        }

        response = self.client.put(url, data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], SchoolValidator.SCHOOL_NAME_ALREADY_EXIST)

    def test_update_school_should_return_not_found_if_school_not_found(self):
        super_user = TestUserFactory.create_super_user()
        token = AuthServiceFactory().create().create_auth_token(super_user.id)
        does_not_exist_school_id = 1234567890

        url = f'/api/schools/{does_not_exist_school_id}'
        headers = {'HTTP_AUTHORIZATION': token.token}
        new_data = TestSchoolFactory.get_test_data()

        response = self.client.put(url, new_data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.NOT_FOUND)
        self.assertEqual(body['error'], exc_messages.SCHOOL_NOT_FOUND)

    def test_should_return_error_if_user_unauthorized(self):
        school = TestSchoolFactory()

        url = f'/api/schools/{school.id}'
        headers = {'HTTP_AUTHORIZATION': 'invalid_token'}
        new_data = TestSchoolFactory.get_test_data()

        response = self.client.put(url, new_data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.NOT_FOUND)
        self.assertEqual(body['error'], exc_messages.USER_NOT_FOUND)

    def test_should_return_error_if_user_is_not_owner_or_superuser(self):
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()
        another_user = TestSchoolFactory()
        token = AuthServiceFactory().create().create_auth_token(another_user.id)

        url = f'/api/schools/{school.id}'
        headers = {'HTTP_AUTHORIZATION': token.token}
        new_data = TestSchoolFactory.get_test_data()

        response = self.client.put(url, new_data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.FORBIDDEN)
        self.assertEqual(body['error'], exc_messages.USER_PERMISSION_DENIED)

    def test_should_enable_superuser_to_delete_school_by_id(self):
        super_user = TestUserFactory.create_super_user()
        token = AuthServiceFactory().create().create_auth_token(super_user.id)
        school = TestSchoolFactory()

        url = f'/api/schools/{school.id}'
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.delete(url, data={}, content_type='application/json', **headers)

        self.assertEqual(response.status_code, StatusCode.NO_CONTENT)

    def test_delete_school_should_return_error_if_user_unauthorized(self):
        token = 'incorrect_token'
        school = TestSchoolFactory()

        url = f'/api/schools/{school.id}'
        headers = {'HTTP_AUTHORIZATION': token}

        response = self.client.delete(url, data={}, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.NOT_FOUND)
        self.assertEqual(body['error'], exc_messages.USER_NOT_FOUND)

    def test_only_superuser_can_delete_school(self):
        school_admin = TestUserFactory.create_school_admin()
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()

        url = f'/api/schools/{school.id}'
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.delete(url, data={}, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.FORBIDDEN)
        self.assertEqual(body['error'], exc_messages.USER_PERMISSION_DENIED)
