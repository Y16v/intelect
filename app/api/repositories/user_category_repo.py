from api.models import UserCategoryORM
from api.exceptions.exeptions import EntityDoesNotExistException


class UserCategoryRepo:
    def __init__(self, user_category_entity):
        self.user_category_entity = user_category_entity
        self._model = UserCategoryORM

    def get_by_id(self, id):
        try:
            user_category = UserCategoryORM.objects.get(id=id)
        except self._model.DoesNotExist:
            raise EntityDoesNotExistException()
        else:
            return self.user_category_entity.create(**user_category.__dict__)

    def get_by_name(self, name):
        try:
            user_category = UserCategoryORM.objects.get(name=name)
        except self._model.DoesNotExist:
            raise EntityDoesNotExistException()
        else:
            return self.user_category_entity.create(**user_category.__dict__)

    def get_by_name_or_create(self, name):
        user_category, created = UserCategoryORM.objects.get_or_create(name=name)

        return self.user_category_entity.create(**user_category.__dict__)
