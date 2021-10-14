from api.exceptions.decorators import catch_exception
from api.views.base import View
from api.status_code import StatusCode
from api.serializers.school import SchoolSerializer


class SchoolListCreateView(View):
    def __init__(self, school_list_interactor, school_create_interactor):
        self.school_list_interactor = school_list_interactor
        self.school_create_interactor = school_create_interactor

    @catch_exception
    def get(self, logged_user_id, *args, **kwargs):
        schools = self.school_list_interactor.set_params(
            logged_user_id=logged_user_id,
        ).execute()

        return SchoolSerializer.list_serialize(schools), StatusCode.OK

    @catch_exception
    def post(self, logged_user_id, owner_id, name, is_active, *args, **kwargs):
        school = self.school_create_interactor.set_params(
            logged_user_id=logged_user_id,
            owner_id=owner_id,
            name=name,
            is_active=is_active
        ).execute()
        data = SchoolSerializer.serialize(school)

        return data, StatusCode.CREATED


class SearchSchoolsView(View):
    def __init__(self, search_schools_interactor):
        self.search_schools_interactor = search_schools_interactor

    @catch_exception
    def get(self, logged_user_id, q=None, page=1, count=10, *args, **kwargs):
        schools, total = self.search_schools_interactor.set_params(
            logged_user_id=logged_user_id,
            q=q,
            page=page,
            count=count
        ).execute()

        data = {
            "total": total,
            "schools": SchoolSerializer.list_serialize(schools)
        }

        return data, StatusCode.OK


class SchoolRetrieveUpdateDeleteView(View):
    def __init__(self, retrieve_school_interactor, update_school_interactor, delete_school_interactor):
        self.retrieve_school_interactor = retrieve_school_interactor
        self.update_school_interactor = update_school_interactor
        self.delete_school_interactor = delete_school_interactor

    @catch_exception
    def get(self, logged_user_id, school_pk, *args, **kwargs):
        school = self.retrieve_school_interactor.set_params(
            logged_user_id=logged_user_id,
            school_pk=school_pk
        ).execute()
        data = SchoolSerializer.serialize(school)
        return data, StatusCode.OK

    @catch_exception
    def put(self, logged_user_id, school_pk, name=None, is_active=None, *args, **kwargs):
        school = self.update_school_interactor.set_params(
            logged_user_id=logged_user_id,
            school_pk=school_pk,
            name=name,
            is_active=is_active
        ).execute()
        data = SchoolSerializer.serialize(school)

        return data, StatusCode.OK

    @catch_exception
    def delete(self, logged_user_id, school_pk, *args, **kwargs):
        self.delete_school_interactor.set_params(
            logged_user_id=logged_user_id,
            school_pk=school_pk,
        ).execute()

        return None, StatusCode.NO_CONTENT


class UpdateSchoolPackageTypeView(View):
    def __init__(self, update_school_package_type_interactor):
        self.update_school_package_interactor = update_school_package_type_interactor

    @catch_exception
    def put(self, logged_user_id, school_id, package_type_id, confirm_password, *args, **kwargs):
        school = self.update_school_package_interactor.set_params(
            logged_user_id=logged_user_id,
            school_id=school_id,
            package_type_id=package_type_id,
            confirm_password=confirm_password
        ).execute()

        return SchoolSerializer.serialize(school), StatusCode.OK


class SchoolUpdatePackageView(View):
    def __init__(self, school_add_package_interactor):
        self.school_add_package_interactor = school_add_package_interactor

    @catch_exception
    def put(self, logged_user_id, school_id, confirm_password, *args, **kwargs):
        school = self.school_add_package_interactor.set_params(
            logged_user_id=logged_user_id,
            school_id=school_id,
            confirm_password=confirm_password
        ).execute()

        return SchoolSerializer.serialize(school), StatusCode.OK
