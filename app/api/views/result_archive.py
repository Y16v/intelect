from api.exceptions.decorators import catch_exception
from api.interactors.result_archives import StudentResultArchiveListInteractor
from api.serializers.archives import ResultArchiveSerializer
from api.status_code import StatusCode
from api.views.base import View


class StudentResultArchiveListView(View):
    def __init__(self,
                 student_result_archive_list_interactor: StudentResultArchiveListInteractor):
        self.student_result_archive_list_interactor = student_result_archive_list_interactor

    @catch_exception
    def get(self, logged_user_id, student_id, start_date=None, end_date=None, *args, **kwargs):
        archives, available_date_range = self.student_result_archive_list_interactor.set_params(
            logged_user_id=logged_user_id,
            student_id=student_id,
            start_date=start_date,
            end_date=end_date
        ).execute()

        data = {
            'available_date_range': available_date_range,
            'result_archives': ResultArchiveSerializer.list_serialize(archives)
        }

        return data, StatusCode.OK
