from api.tests.utils.common import CustomTestCase
from django.contrib.auth import authenticate

from api.factories.services.auth_service import AuthServiceFactory
from api.status_code import StatusCode
from api.tests.utils.user_factory import TestUserFactory
from api.exceptions import messages as exc_messages


class AuthAPITests(CustomTestCase):
    def test_should_auth_user_if_login_and_password_is_correct(self):
        user = TestUserFactory()

        url = '/api/login'
        data = {
            'username': user.username,
            'password': user.student_password
        }

        response = self.client.post(url, data=data, content_type='application/json')
        body = response.json()
        logged_user_id = AuthServiceFactory().create().get_user_id_of_auth_token(access_token=body['token'])

        self.assertEqual(response.status_code, StatusCode.OK)
        self.assertEqual(logged_user_id, user.id)

    def test_should_return_404_if_username_not_found(self):
        url = '/api/login'
        data = {
            'username': 'not_exist_username',
            'password': 'not_exist_password'
        }

        response = self.client.post(url, data=data, content_type='application/json')
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.NOT_FOUND)
        self.assertEqual(body['error'], exc_messages.USER_NOT_FOUND)

    def test_should_return_403_if_password_not_match(self):
        user = TestUserFactory()

        url = '/api/login'
        data = {
            'username': user.username,
            'password': 'not_exist_password'
        }

        response = self.client.post(url, data=data, content_type='application/json')
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.FORBIDDEN)
        self.assertEqual(body['error'], exc_messages.PASSWORD_DON_NOT_MATCH)

    def test_should_return_current_user(self):
        user = TestUserFactory.create_super_user()
        token = AuthServiceFactory().create().create_auth_token(user.id)

        url = '/api/users/current'
        headers = {
            'HTTP_AUTHORIZATION': token.token
        }

        response = self.client.get(url, data=None, **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.OK)
        self.is_equal_user_dicts(user.__dict__, body)

    def test_should_return_not_found_error_if_user_not_found(self):
        url = '/api/users/current'
        headers = {
            'HTTP_AUTHORIZATION': 'incorrect_token'
        }

        response = self.client.get(url, data=None, **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.NOT_FOUND)
        self.assertEqual(body['error'], exc_messages.USER_NOT_FOUND)

    def test_should_change_password(self):
        user = TestUserFactory()
        token = AuthServiceFactory().create().create_auth_token(user.id)
        new_password = 'new_password'

        url = '/api/users/current/change_password'
        data = {
            'old_password': user.student_password,
            'new_password': new_password,
            'confirm_password': new_password
        }
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.post(url, data=data, **headers, content_type='application/json')
        body = response.json()

        u = authenticate(username=user.username, password=new_password)
        self.is_equal_user_dicts(u.__dict__, body)

    def test_should_return_ok_and_user_after_change_password(self):
        user = TestUserFactory()
        token = AuthServiceFactory().create().create_auth_token(user.id)
        new_password = 'new_password'

        url = '/api/users/current/change_password'
        data = {
            'old_password': user.student_password,
            'new_password': new_password,
            'confirm_password': new_password
        }
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.post(url, data=data, **headers, content_type='application/json')
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.OK)
        self.is_equal_user_dicts(user.__dict__, body)

    def test_should_return_error_if_client_is_unauthorized(self):
        user = TestUserFactory()
        new_password = 'new_password'

        url = '/api/users/current/change_password'
        data = {
            'old_password': user.student_password,
            'new_password': new_password,
            'confirm_password': new_password
        }
        headers = {'HTTP_AUTHORIZATION': 'incorrect_token'}

        response = self.client.post(url, data=data, **headers, content_type='application/json')
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.NOT_FOUND)
        self.assertEqual(body['error'], exc_messages.USER_NOT_FOUND)

    def test_should_return_forbidden_error_if_old_password_is_incorrect(self):
        user = TestUserFactory()
        token = AuthServiceFactory().create().create_auth_token(user.id)
        new_password = 'new_password'

        url = '/api/users/current/change_password'
        data = {
            'old_password': 'incorrect_password',
            'new_password': new_password,
            'confirm_password': new_password
        }
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.post(url, data=data, **headers, content_type='application/json')
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.FORBIDDEN)
        self.assertEqual(body['error'], exc_messages.PASSWORD_DON_NOT_MATCH)

    def test_should_return_error_if_new_and_confirm_passwords_not_match(self):
        user = TestUserFactory()
        token = AuthServiceFactory().create().create_auth_token(user.id)

        url = '/api/users/current/change_password'
        data = {
            'old_password': user.student_password,
            'new_password': 'new_password',
            'confirm_password': 'incorrect_confirm'
        }
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.post(url, data=data, **headers, content_type='application/json')
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.UNPROCESSABLE_ENTITY)
        self.assertEqual(body['error'], exc_messages.NEW_AND_CONFIRM_PASSWORDS_NOT_MATCH)


    def test_should_auth_user_if_login_and_password_is_correct(self):
        user = TestUserFactory()

        url = '/api/login'
        data = {
            'username': user.username,
            'password': user.student_password
        }

        response = self.client.post(url, data=data, content_type='application/json')
        body = response.json()
        logged_user_id = AuthServiceFactory().create().get_user_id_of_auth_token(access_token=body['token'])

        self.assertEqual(response.status_code, StatusCode.OK)
        self.assertEqual(logged_user_id, user.id)