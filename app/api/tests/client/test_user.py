from django.urls import reverse

from api.status_code import StatusCode
from api.tests.utils.common import CustomTestCase
from api.tests.utils.school_factory import TestSchoolFactory
from api.tests.utils.user_factory import TestUserFactory
from api.exceptions import messages as exc_messages


class TestUser(CustomTestCase):
    def test_retrieve_user_should_raise_unauthorized_if_cant_authorize(self):
        user = TestUserFactory()

        url = reverse('api:retrieve_user', args=[user.id])
        self.headers['HTTP_AUTHORIZATION'] = 'incorrect_token'

        response = self.client.get(url, **self.headers)
        body = response.json()

        self.assertEqual(response.status_code, StatusCode.UNAUTHORIZED)
        self.assertEqual(body['error'], exc_messages.AUTH_REQUIRED)

    def test_should_raise_forbidden_if_user_is_not_active(self):
        pass

    def test_should_raise_forbidden_if_user_is_student(self):
        pass
