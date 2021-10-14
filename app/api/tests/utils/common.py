import json

from django.test import TestCase


class CustomTestCase(TestCase):
    headers = {'content_type': "application/json"}

    def is_equal_user_dicts(self, first: dict, second: dict):
        self.assertEqual(first['category_id'], second['category_id'])
        self.assertEqual(first['school_id'], second['school_id'])
        self.assertEqual(first['teacher_id'], second['teacher_id'])
        self.assertEqual(first['username'], second['username'])
        self.assertEqual(first['phone'], second['phone'])
        self.assertEqual(first['email'], second['email'])
        self.assertEqual(first['first_name'], second['first_name'])
        self.assertEqual(first['last_name'], second['last_name'])
        self.assertEqual(first['is_active'], second['is_active'])

    def is_equal_school_dists(self, first: dict, second: dict):
        self.assertEqual(first['owner_id'], second['owner_id'])
        self.assertEqual(first['name'], second['name'])
        self.assertEqual(first['package'], second['package'])
        self.assertEqual(first['is_active'], second['is_active'])


def is_jsonable(x):
    try:
        json.dumps(x)
        return True
    except:
        return False


