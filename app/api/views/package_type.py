from api.exceptions.decorators import catch_exception
from api.serializers.package_type_serializer import PackageTypeSerializer
from api.status_code import StatusCode
from api.views.base import View


class PackageTypeListView(View):
    def __init__(self, package_type_list_interactor):
        self.package_type_list_interactor = package_type_list_interactor

    @catch_exception
    def get(self, logged_user_id, is_for_individual_students=False, *args, **kwargs):
        package_types = self.package_type_list_interactor.set_params(
            logged_user_id=logged_user_id,
            is_for_individual_students=is_for_individual_students
        ).execute()

        return PackageTypeSerializer.serialize_list(package_types), StatusCode.OK
