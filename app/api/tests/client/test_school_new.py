from api.tests.utils.package_type_factory import TestPackageTypeFactory
from django.urls import reverse
from api.tests.utils.common import CustomTestCase
from api.tests.utils.school_factory import TestSchoolFactory

from api.factories.services.auth_service import AuthServiceFactory
from api.status_code import StatusCode
from api.tests.utils.user_factory import TestUserFactory

from api.validators.user_permission_validator import UserPermissionValidator
from api.validators.school_validator import SchoolValidator
from api.validators.package_type_validator import PackageTypeValidator
from api.exceptions import messages as exc_messages


class SchoolAPITestCopy(CustomTestCase):
    def test_update_package_should_return_unauthorized_if_token_is_invalid(self):
        user = TestUserFactory()
        school = TestSchoolFactory()

        url = reverse('api:school_update_package', args=[school.id])
        data = {"confirm_password": user.student_password}
        self.headers['HTTP_AUTHORIZATION'] = 'incorrect_token'

        response = self.client.put(url, data, **self.headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.UNAUTHORIZED)
        self.assertEqual(body['error'], exc_messages.AUTH_REQUIRED)

    def test_update_package_should_return_error_if_user_is_not_active(self):
        user = TestUserFactory(is_active=False)
        school = TestSchoolFactory()

        url = reverse('api:school_update_package', args=[school.id])

        token = AuthServiceFactory.create().create_auth_token(user.id)
        data = {"confirm_password": user.student_password}
        self.headers['HTTP_AUTHORIZATION'] = token.token

        response = self.client.put(url, data, **self.headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.FORBIDDEN)
        self.assertEqual(body['error'], UserPermissionValidator.USER_IS_NOT_ACTIVE)

    def test_update_package_should_return_error_if_user_is_not_superuser_or_owner_of_school(self):
        school = TestSchoolFactory()
        another_user = TestUserFactory()

        url = reverse('api:school_update_package', args=[school.id])
        data = {"confirm_password": another_user.student_password}
        token = AuthServiceFactory.create().create_auth_token(another_user.id)
        self.headers['HTTP_AUTHORIZATION'] = token.token

        response = self.client.put(url, data, **self.headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.FORBIDDEN)
        self.assertEqual(body['error'], UserPermissionValidator.USER_MUST_BE_SUPERUSER_OR_OWNER_OF_SCHOOL)

    def test_update_package_should_return_forbidden_if_password_not_match(self):
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()

        url = reverse('api:school_update_package', args=[school.id])
        data = {"confirm_password": 'incorrect password'}
        token = AuthServiceFactory.create().create_auth_token(school_admin.id)
        self.headers['HTTP_AUTHORIZATION'] = token.token

        response = self.client.put(url, data, **self.headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.FORBIDDEN)
        self.assertEqual(body['error'], exc_messages.PASSWORD_DON_NOT_MATCH)

    def test_should_update_package(self):
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin)
        school_admin.school = school
        school_admin.save()

        url = reverse('api:school_update_package', args=[school.id])
        data = {"confirm_password": school_admin.student_password}
        token = AuthServiceFactory.create().create_auth_token(school_admin.id)
        self.headers['HTTP_AUTHORIZATION'] = token.token

        response = self.client.put(url, data, **self.headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.OK)
        self.assertEqual(body['package'], school.package + school.package_type.accounts_quantity)

    def test_update_school_package_type_should_return_unauthorized_if_token_is_invalid(self):
        school = TestSchoolFactory()
        new_package_type = TestPackageTypeFactory()

        url = reverse('api:school_update_package_type', args=[school.id])
        data = {"package_type_id": new_package_type.id, "confirm_password": None}
        self.headers['HTTP_AUTHORIZATION'] = 'incorrect_token'

        response = self.client.put(url, data, **self.headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.UNAUTHORIZED)
        self.assertEqual(body['error'], exc_messages.AUTH_REQUIRED)

    def test_update_school_package_type_should_return_forbidden_if_user_is_not_active(self):
        user = TestUserFactory(is_active=False)
        school = TestSchoolFactory()
        new_package_type = TestPackageTypeFactory()

        url = reverse('api:school_update_package_type', args=[school.id])
        data = {"package_type_id": new_package_type.id, "confirm_password": None}
        token = AuthServiceFactory.create().create_auth_token(user.id)
        self.headers['HTTP_AUTHORIZATION'] = token.token

        response = self.client.put(url, data, **self.headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.FORBIDDEN)
        self.assertEqual(body['error'], UserPermissionValidator.USER_IS_NOT_ACTIVE)

    def test_update_school_package_type_should_return_forbidden_if_user_is_not_superuser_and_owner_of_school(self):
        school = TestSchoolFactory()
        new_package_type = TestPackageTypeFactory()
        another_user = TestUserFactory()

        url = reverse('api:school_update_package_type', args=[school.id])
        data = {"package_type_id": new_package_type.id, "confirm_password": None}
        token = AuthServiceFactory.create().create_auth_token(another_user.id)
        self.headers['HTTP_AUTHORIZATION'] = token.token

        response = self.client.put(url, data, **self.headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.FORBIDDEN)
        self.assertEqual(body['error'], UserPermissionValidator.USER_MUST_BE_SUPERUSER_OR_OWNER_OF_SCHOOL)

    def test_update_school_package_type_should_return_forbidden_if_confirm_password_not_match(self):
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin, package=0)
        new_package_type = TestPackageTypeFactory(is_for_individual_students=False)
        school_admin.school = school
        school_admin.save()

        url = reverse('api:school_update_package_type', args=[school.id])
        data = {"package_type_id": new_package_type.id, "confirm_password": "incorrect password"}
        token = AuthServiceFactory.create().create_auth_token(school_admin.id)
        self.headers['HTTP_AUTHORIZATION'] = token.token

        response = self.client.put(url, data, **self.headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.FORBIDDEN)
        self.assertEqual(body['error'], exc_messages.PASSWORD_DON_NOT_MATCH)

    def test_update_school_package_type_should_return_bad_request_if_school_has_available_packages(self):
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin, package=1)
        new_package_type = TestPackageTypeFactory()
        school_admin.school = school
        school_admin.save()

        url = reverse('api:school_update_package_type', args=[school.id])
        data = {"package_type_id": new_package_type.id, "confirm_password": school_admin.student_password}
        token = AuthServiceFactory.create().create_auth_token(school_admin.id)
        self.headers['HTTP_AUTHORIZATION'] = token.token

        response = self.client.put(url, data, **self.headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], SchoolValidator.SCHOOL_HAS_AVAILABLE_PACKAGE)

    def test_update_school_package_type_should_return_bad_request_if_package_type_is_for_individual_students(self):
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin, package=0)
        new_package_type = TestPackageTypeFactory(is_for_individual_students=True)
        school_admin.school = school
        school_admin.save()

        url = reverse('api:school_update_package_type', args=[school.id])
        data = {"package_type_id": new_package_type.id, "confirm_password": school_admin.student_password}
        token = AuthServiceFactory.create().create_auth_token(school_admin.id)
        self.headers['HTTP_AUTHORIZATION'] = token.token

        response = self.client.put(url, data, **self.headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.BAD_REQUEST)
        self.assertEqual(body['error'], PackageTypeValidator.PACKAGE_TYPE_SHOULD_BE_FOR_SCHOOLS)

    def test_update_school_package_type_should_update_school_package_type(self):
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin, package=0)
        new_package_type = TestPackageTypeFactory(is_for_individual_students=False)
        school_admin.school = school
        school_admin.save()

        url = reverse('api:school_update_package_type', args=[school.id])
        data = {"package_type_id": new_package_type.id, "confirm_password": school_admin.student_password}
        token = AuthServiceFactory.create().create_auth_token(school_admin.id)
        self.headers['HTTP_AUTHORIZATION'] = token.token

        response = self.client.put(url, data, **self.headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.OK)
        self.assertEqual(body['package_type_id'], new_package_type.id)

    def test_update_school_package_type_should_update_school_available_packages(self):
        school_admin = TestUserFactory.create_school_admin()
        school = TestSchoolFactory(owner=school_admin, package=0)
        new_package_type = TestPackageTypeFactory(is_for_individual_students=False)
        school_admin.school = school
        school_admin.save()

        url = reverse('api:school_update_package_type', args=[school.id])
        data = {"package_type_id": new_package_type.id, "confirm_password": school_admin.student_password}
        token = AuthServiceFactory.create().create_auth_token(school_admin.id)
        self.headers['HTTP_AUTHORIZATION'] = token.token

        response = self.client.put(url, data, **self.headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.OK)
        self.assertEqual(body['package'], new_package_type.accounts_quantity)
