from api.exceptions.decorators import catch_exception
from api.serializers.group import GroupSerializer
from api.status_code import StatusCode
from api.views.base import View


class GroupListCreateView(View):
    def __init__(self, group_list_interactor, group_create_interactor):
        self.group_list_interactor = group_list_interactor
        self.group_create_interactor = group_create_interactor

    @catch_exception
    def get(self, logged_user_id, school_id, teacher_id=None, *args, **kwargs):
        groups = self.group_list_interactor.set_params(
            logged_user_id=logged_user_id,
            school_id=school_id,
            teacher_id=teacher_id
        ).execute()
        data = []
        for group in groups:
            data.append(
                GroupSerializer.serialize(group)
            )

        return data, StatusCode.OK

    @catch_exception
    def post(self, logged_user_id, school_id, teacher_id, name, *args, **kwargs):
        group = self.group_create_interactor.set_params(
            logged_user_id=logged_user_id,
            school_id=school_id,
            teacher_id=teacher_id,
            name=name
        ).execute()

        return GroupSerializer.serialize(group), StatusCode.CREATED


class SchoolGroupRetrieveUpdateDeleteView(View):
    def __init__(self,
                 school_group_retrieve_interactor,
                 school_group_update_interactor,
                 school_group_delete_interactor
                 ):
        self.school_group_retrieve_interactor = school_group_retrieve_interactor
        self.school_group_update_interactor = school_group_update_interactor
        self.school_group_delete_interactor = school_group_delete_interactor

    @catch_exception
    def get(self, logged_user_id, school_id, group_id, *args, **kwargs):
        group = self.school_group_retrieve_interactor.set_params(
            logged_user_id=logged_user_id,
            school_id=school_id,
            group_id=group_id
        ).execute()

        return GroupSerializer.serialize(group), StatusCode.OK

    @catch_exception
    def put(self, logged_user_id, school_id, group_id, name, *args, **kwargs):
        group = self.school_group_update_interactor.set_params(
            logged_user_id=logged_user_id,
            school_id=school_id,
            group_id=group_id,
            name=name
        ).execute()

        return GroupSerializer.serialize(group), StatusCode.OK

    @catch_exception
    def delete(self, logged_user_id, school_id, group_id, *args, **kwargs):
        self.school_group_delete_interactor.set_params(
            logged_user_id=logged_user_id,
            school_id=school_id,
            group_id=group_id
        ).execute()

        return True, StatusCode.NO_CONTENT
