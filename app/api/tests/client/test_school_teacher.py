from api.tests.utils.common import CustomTestCase

from api.factories.services.auth_service import AuthServiceFactory
from api.status_code import StatusCode
from api.tests.utils.school_factory import TestSchoolFactory
from api.tests.utils.user_factory import TestUserFactory
from api.exceptions import messages as exc_messages
from api.validators.user_validator import UserValidator


class SchoolTeachersAPITest(CustomTestCase):
    def test_should_let_superuser_to_view_school_teachers(self):
        superuser = TestUserFactory.create_super_user()
        token = AuthServiceFactory().create().create_auth_token(superuser.id)
        school = TestSchoolFactory()
        teachers = TestUserFactory.create_many_teachers(school_id=school.id)

        url = f'/api/schools/{school.id}/teachers'
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.get(url, **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.OK)
        teachers = list(reversed(teachers))
        for i in range(len(body)):
            self.is_equal_user_dicts(teachers[i].__dict__, body[i])

    def test_should_return_not_found_if_school_does_not_exist(self):
        school_admin = TestUserFactory.create_school_admin()
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        does_not_exist_school_id = 12345678

        url = f'/api/schools/{does_not_exist_school_id}/teachers'
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.get(url, **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.NOT_FOUND)
        self.assertEqual(body['error'], exc_messages.SCHOOL_NOT_FOUND)

    def test_should_return_error_if_user_unauthorized(self):
        school = TestSchoolFactory()

        url = f'/api/schools/{school.id}/teachers'
        headers = {'HTTP_AUTHORIZATION': 'invalid_token'}

        response = self.client.get(url, **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.UNAUTHORIZED)
        self.assertEqual(body['error'], exc_messages.AUTH_REQUIRED)

    def test_should_return_error_if_user_is_not_owner_or_school_admin(self):
        school = TestSchoolFactory()
        another_user = TestUserFactory()
        token = AuthServiceFactory().create().create_auth_token(another_user.id)

        url = f'/api/schools/{school.id}/teachers'
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.get(url, **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.FORBIDDEN)
        self.assertEqual(body['error'], exc_messages.USER_PERMISSION_DENIED)

    def test_update_teacher_should_return_unauthorized(self):
        school = TestSchoolFactory()
        teacher = TestUserFactory.create_teacher(school.id)

        url = f'/api/schools/{school.id}/teachers/{teacher.id}'
        new_teacher_data = TestUserFactory.get_test_data()
        token = 'invalid_token'
        headers = {'HTTP_AUTHORIZATION': token}

        response = self.client.put(url, new_teacher_data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.UNAUTHORIZED)
        self.assertEqual(body['error'], exc_messages.AUTH_REQUIRED)

    def test_update_teacher_should_return_forbidden_if_user_is_not_school_owner(self):
        school = TestSchoolFactory()
        teacher = TestUserFactory.create_teacher(school.id)
        not_permitted_user = TestUserFactory()

        url = f'/api/schools/{school.id}/teachers/{teacher.id}'
        new_teacher_data = TestUserFactory.get_test_data()
        token = AuthServiceFactory().create().create_auth_token(not_permitted_user.id).token
        headers = {'HTTP_AUTHORIZATION': token}

        response = self.client.put(url, new_teacher_data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.FORBIDDEN)
        self.assertEqual(body['error'], exc_messages.USER_PERMISSION_DENIED)

    def test_update_teacher_should_return_error_if_teacher_not_found(self):
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()
        not_exist_teacher_id = 12345678

        url = f'/api/schools/{school.id}/teachers/{not_exist_teacher_id}'
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        new_teacher_data = TestUserFactory.get_test_data()
        headers = {'HTTP_AUTHORIZATION': token.token}

        response = self.client.put(url, new_teacher_data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.NOT_FOUND)
        self.assertEqual(body['error'], exc_messages.USER_NOT_FOUND)

    def test_update_teacher_should_return_error_if_username_already_taken(self):
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()
        teacher = TestUserFactory.create_teacher(school.id)
        exist_user = TestUserFactory()

        url = f'/api/schools/{school.id}/teachers/{teacher.id}'
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        headers = {'HTTP_AUTHORIZATION': token.token}
        new_teacher_data = TestUserFactory.get_test_data()
        new_teacher_data['username'] = exist_user.username

        response = self.client.put(url, new_teacher_data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], exc_messages.get_user_unique_field_error('username'))

    def test_update_teacher_should_return_bad_request_if_email_payload_is_invalid(self):
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()
        teacher = TestUserFactory.create_teacher(school.id)
        invalid_email = 'invalid_email_.gmail.com'

        url = f'/api/schools/{school.id}/teachers/{teacher.id}'
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        headers = {'HTTP_AUTHORIZATION': token.token}
        new_teacher_data = TestUserFactory.get_test_data()
        new_teacher_data['email'] = invalid_email

        response = self.client.put(url, new_teacher_data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], UserValidator.EMAIL_IS_NOT_VALID)

    def test_update_teacher_should_return_error_if_email_already_taken(self):
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()
        teacher = TestUserFactory.create_teacher(school.id)
        exist_user = TestUserFactory()

        url = f'/api/schools/{school.id}/teachers/{teacher.id}'
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        headers = {'HTTP_AUTHORIZATION': token.token}
        new_teacher_data = TestUserFactory.get_test_data()
        new_teacher_data['email'] = exist_user.email

        response = self.client.put(url, new_teacher_data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], exc_messages.get_user_unique_field_error('email'))

    def test_update_teacher_should_return_bad_request_if_phone_payload_is_invalid(self):
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()
        teacher = TestUserFactory.create_teacher(school.id)
        invalid_phone = "invalid_phone+996779583738"

        url = f'/api/schools/{school.id}/teachers/{teacher.id}'
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        headers = {'HTTP_AUTHORIZATION': token.token}
        new_teacher_data = TestUserFactory.get_test_data()
        new_teacher_data['phone'] = invalid_phone

        response = self.client.put(url, new_teacher_data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], UserValidator.PHONE_IS_NOT_VALID)

    def test_update_teacher_should_return_error_if_phone_already_taken(self):
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()
        teacher = TestUserFactory.create_teacher(school.id)
        exist_user = TestUserFactory()

        url = f'/api/schools/{school.id}/teachers/{teacher.id}'
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        headers = {'HTTP_AUTHORIZATION': token.token}
        new_teacher_data = TestUserFactory.get_test_data()
        new_teacher_data['phone'] = exist_user.phone

        response = self.client.put(url, new_teacher_data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], exc_messages.get_user_unique_field_error('phone'))

    def test_should_let_school_owner_to_update_teachers_data(self):
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()
        teacher = TestUserFactory.create_teacher(school.id)

        url = f'/api/schools/{school.id}/teachers/{teacher.id}'
        token = AuthServiceFactory().create().create_auth_token(school_admin.id)
        headers = {'HTTP_AUTHORIZATION': token.token}
        new_teacher_data = TestUserFactory.get_test_data()

        response = self.client.put(url, new_teacher_data, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.OK)
        self.assertEqual(body['username'], new_teacher_data['username'])
        self.assertEqual(body['email'], new_teacher_data['email'])
        self.assertEqual(body['phone'], new_teacher_data['phone'])
        self.assertEqual(body['first_name'], new_teacher_data['first_name'])
        self.assertEqual(body['last_name'], new_teacher_data['last_name'])

    def test_should_return_unauthorized(self):
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()
        teacher = TestUserFactory.create_teacher(school.id)

        url = f'/api/schools/{school.id}/teachers/{teacher.id}/update_access'
        headers = {'HTTP_AUTHORIZATION': 'invalid_token'}

        response = self.client.put(url, data={}, content_type='application/json', **headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.UNAUTHORIZED)
        self.assertEqual(body['error'], exc_messages.AUTH_REQUIRED)

    def test_should_return_error_if_user_is_not_owner_of_school(self):
        pass

    def test_should_return_error_if_teacher_not_found_in_school(self):
        pass

    def test_should_update_teacher_accesses(self):
        pass
