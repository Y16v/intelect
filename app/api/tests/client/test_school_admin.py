from api.models import UserCategoryORM
from api.models.constants import UserCategory
from api.tests.utils.common import CustomTestCase
from api.tests.utils.school_factory import TestSchoolFactory

from api.factories.services.auth_service import AuthServiceFactory
from api.status_code import StatusCode
from api.tests.utils.user_factory import TestUserFactory
from api.exceptions import messages as exc_messages
from api.validators.user_validator import UserValidator


class SchoolAdminAPITest(CustomTestCase):
    def setUp(self) -> None:
        self.super_admin_category = UserCategoryORM.objects.get(name=UserCategory.SUPER_ADMIN)
        self.school_admin_category = UserCategoryORM.objects.get(name=UserCategory.SCHOOL_ADMIN)

    def test_should_create_school_admin(self):
        super_user = TestUserFactory.create_super_user()
        token = AuthServiceFactory().create().create_auth_token(super_user.id)

        url = '/api/school_admins'
        data = TestUserFactory.get_test_data()
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.post(url, data=data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.CREATED)
        self.assertEqual(body['category_id'], self.school_admin_category.id)

    def test_create_school_admin_should_return_error_if_user_is_unauthorized(self):
        url = '/api/school_admins'
        data = TestUserFactory.get_test_data()
        headers = {'HTTP_AUTHORIZATION': 'incorrect_token'}

        response = self.client.post(url, data=data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.NOT_FOUND)
        self.assertEqual(body['error'], exc_messages.USER_NOT_FOUND)

    def test_create_school_admin_should_return_forbidden_if_user_is_not_super_user(self):
        not_superuser = TestUserFactory.create_school_admin()
        token = AuthServiceFactory().create().create_auth_token(not_superuser.id)

        url = '/api/school_admins'
        data = TestUserFactory.get_test_data()
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.post(url, data=data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.FORBIDDEN)
        self.assertEqual(body['error'], exc_messages.USER_PERMISSION_DENIED)

    def test_create_school_admin_should_return_bad_request_if_phone_payload_is_invalid(self):
        super_user = TestUserFactory.create_super_user()
        invalid_phone = '+nine_nine_six_etc996779583738'

        url = '/api/school_admins'
        data = TestUserFactory.get_test_data(phone=invalid_phone)
        token = AuthServiceFactory().create().create_auth_token(super_user.id)
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.post(url, data=data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], UserValidator.PHONE_IS_NOT_VALID)

    def test_should_raise_error_if_phone_already_exist(self):
        super_user = TestUserFactory.create_super_user()
        exist_user = TestUserFactory()
        token = AuthServiceFactory().create().create_auth_token(super_user.id)

        url = '/api/school_admins'
        data = TestUserFactory.get_test_data(phone=exist_user.phone)
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.post(url, data=data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], exc_messages.get_user_unique_field_error('phone'))

    def test_create_school_admin_should_return_bad_request_if_email_payload_is_invalid(self):
        super_user = TestUserFactory.create_super_user()
        invalid_email = 'it_is_not_valid_email_gmail.com'

        url = '/api/school_admins'
        data = TestUserFactory.get_test_data(email=invalid_email)
        token = AuthServiceFactory().create().create_auth_token(super_user.id)
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.post(url, data=data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], UserValidator.EMAIL_IS_NOT_VALID)

    def test_should_raise_error_if_user_with_email_already_exist(self):
        super_user = TestUserFactory.create_super_user()
        exist_user = TestUserFactory()
        token = AuthServiceFactory().create().create_auth_token(super_user.id)

        url = '/api/school_admins'
        data = TestUserFactory.get_test_data(email=exist_user.email)
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.post(url, data=data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], exc_messages.get_user_unique_field_error('email'))

    def test_should_raise_error_if_user_with_username_already_exist(self):
        super_user = TestUserFactory.create_super_user()
        exist_user = TestUserFactory()
        token = AuthServiceFactory().create().create_auth_token(super_user.id)

        url = '/api/school_admins'
        data = TestUserFactory.get_test_data()
        data['username'] = exist_user.username
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.post(url, data=data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], exc_messages.get_user_unique_field_error('username'))

    def test_should_retrieve_school_admin_to_superuser(self):
        super_user = TestUserFactory.create_super_user()
        token = AuthServiceFactory().create().create_auth_token(super_user.id)
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school_id = school.id
        school_admin.save()

        url = f'/api/school_admins/{school_admin.id}'
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.get(url, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.OK)
        self.is_equal_user_dicts(body, school_admin.__dict__)

    def test_should_retrieve_school_admin_to_self(self):
        school_admin = TestUserFactory.create_school_admin()
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school_id = school.id
        school_admin.save()

        url = f'/api/school_admins/{school_admin.id}'
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.get(url, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.OK)
        self.is_equal_user_dicts(body, school_admin.__dict__)

    def test_should_raise_not_found_if_school_admin_doesnt_exist(self):
        super_user = TestUserFactory.create_super_user()
        token = AuthServiceFactory().create().create_auth_token(super_user.id)

        does_not_exist_school_admin_id = 123456789

        url = f'/api/school_admins/{does_not_exist_school_admin_id}'
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.get(url, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.NOT_FOUND)
        self.assertEqual(body['error'], exc_messages.USER_NOT_FOUND)

    def test_retrieve_school_admin_should_raise_error_if_user_is_unauthorized(self):
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school_id = school.id
        school_admin.save()

        url = f'/api/school_admins/{school_admin.id}'
        headers = {'HTTP_AUTHORIZATION': 'incorrect_token'}

        response = self.client.get(url, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.NOT_FOUND)
        self.assertEqual(body['error'], exc_messages.USER_NOT_FOUND)

    def test_should_raise_forbidden_if_user_not_owner_or_school_admin(self):
        another_user = TestUserFactory()
        token = AuthServiceFactory().create().create_auth_token(another_user.id)

        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school_id = school.id
        school_admin.save()

        url = f'/api/school_admins/{school_admin.id}'
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.get(url, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.FORBIDDEN)
        self.assertEqual(body['error'], exc_messages.USER_PERMISSION_DENIED)

    def test_should_let_superuser_to_update_school_admin(self):
        super_user = TestUserFactory.create_super_user()
        token = AuthServiceFactory().create().create_auth_token(super_user.id)
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school_id = school.id
        school_admin.save()

        url = f'/api/school_admins/{school_admin.id}'
        headers = {'HTTP_AUTHORIZATION': token.token}
        new_datas = TestUserFactory.get_test_data()

        response = self.client.put(url, new_datas, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.OK)
        self.assertEqual(body['first_name'], new_datas['first_name'])
        self.assertEqual(body['last_name'], new_datas['last_name'])
        self.assertEqual(body['username'], new_datas['username'])
        self.assertEqual(body['email'], new_datas['email'])
        self.assertEqual(body['phone'], new_datas['phone'])

    def test_should_let_superuser_to_self(self):
        school_admin = TestUserFactory.create_school_admin()
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school_id = school.id
        school_admin.save()

        url = f'/api/school_admins/{school_admin.id}'
        headers = {'HTTP_AUTHORIZATION': token.token}
        new_datas = TestUserFactory.get_test_data()

        response = self.client.put(url, new_datas, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.OK)
        self.assertEqual(body['first_name'], new_datas['first_name'])
        self.assertEqual(body['last_name'], new_datas['last_name'])
        self.assertEqual(body['username'], new_datas['username'])
        self.assertEqual(body['email'], new_datas['email'])
        self.assertEqual(body['phone'], new_datas['phone'])

    def test_should_return_error_if_school_admin_not_found(self):
        does_not_exist_school_admin_id = 23456789
        super_user = TestUserFactory.create_super_user()
        token = AuthServiceFactory().create().create_auth_token(super_user.id)

        url = f'/api/school_admins/{does_not_exist_school_admin_id}'
        new_datas = TestUserFactory.get_test_data()
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.put(url, new_datas, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.NOT_FOUND)
        self.assertEqual(body['error'], exc_messages.USER_NOT_FOUND)

    def test_update_school_admin_should_return_error_if_user_exists_with_this_username(self):
        super_user = TestUserFactory.create_super_user()
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school_id = school.id
        school_admin.save()
        exist_user = TestUserFactory()

        url = f'/api/school_admins/{school_admin.id}'
        new_datas = {
            'username': exist_user.username
        }
        headers = {'HTTP_AUTHORIZATION': AuthServiceFactory().create().create_auth_token(super_user.id).token}

        response = self.client.put(url, new_datas, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], exc_messages.get_user_unique_field_error('username'))

    def test_update_school_admin_should_return_bad_request_if_phone_is_not_valid(self):
        super_user = TestUserFactory.create_super_user()
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school_id = school.id
        school_admin.save()

        url = f'/api/school_admins/{school_admin.id}'
        new_data = {'phone': 'invalid_phone'}
        token = AuthServiceFactory().create().create_auth_token(super_user.id)
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.put(url, new_data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], UserValidator.PHONE_IS_NOT_VALID)

    def test_update_school_admin_should_return_error_if_user_exists_with_this_phone(self):
        super_user = TestUserFactory.create_super_user()
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school_id = school.id
        school_admin.save()
        exist_user = TestUserFactory()

        url = f'/api/school_admins/{school_admin.id}'
        new_datas = {
            'phone': exist_user.phone
        }
        headers = {'HTTP_AUTHORIZATION': AuthServiceFactory().create().create_auth_token(super_user.id).token}

        response = self.client.put(url, new_datas, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], exc_messages.get_user_unique_field_error('phone'))

    def test_update_school_admin_should_return_bad_request_if_email_is_invalid(self):
        super_user = TestUserFactory.create_super_user()
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school_id = school.id
        school_admin.save()

        url = f'/api/school_admins/{school_admin.id}'
        new_data = {'email': 'invalid_email'}
        token = AuthServiceFactory().create().create_auth_token(super_user.id)
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.put(url, new_data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], UserValidator.EMAIL_IS_NOT_VALID)

    def test_update_school_admin_should_return_error_if_user_exists_with_this_email(self):
        super_user = TestUserFactory.create_super_user()
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school_id = school.id
        school_admin.save()
        exist_user = TestUserFactory()

        url = f'/api/school_admins/{school_admin.id}'
        new_datas = {
            'email': exist_user.email
        }
        headers = {'HTTP_AUTHORIZATION': AuthServiceFactory().create().create_auth_token(super_user.id).token}

        response = self.client.put(url, new_datas, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], exc_messages.get_user_unique_field_error('email'))

    def test_update_school_admin_should_return_error_if_user_is_unauthorized(self):
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school_id = school.id
        school_admin.save()
        exist_user = TestUserFactory()

        url = f'/api/school_admins/{school_admin.id}'
        new_datas = {
            'email': exist_user.email
        }
        headers = {'HTTP_AUTHORIZATION': 'incorrect_token'}

        response = self.client.put(url, new_datas, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.NOT_FOUND)
        self.assertEqual(body['error'], exc_messages.USER_NOT_FOUND)

    def test_update_should_return_error_if_user_not_him_self_or_superuser(self):
        another_user = TestUserFactory()
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school_id = school.id
        school_admin.save()
        exist_user = TestUserFactory()

        url = f'/api/school_admins/{school_admin.id}'
        new_datas = {
            'email': exist_user.email
        }
        headers = {'HTTP_AUTHORIZATION':  AuthServiceFactory().create().create_auth_token(another_user.id).token}

        response = self.client.put(url, new_datas, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.FORBIDDEN)
        self.assertEqual(body['error'], exc_messages.USER_PERMISSION_DENIED)


