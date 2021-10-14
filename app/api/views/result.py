from api.exceptions.decorators import catch_exception
from api.serializers.result import ResultSerializer
from api.status_code import StatusCode
from api.views.base import View


class ResultView(View):
    def __init__(self, get_result_interactor, create_result_interactor):
        self.get_result_interactor = get_result_interactor
        self.create_result_interactor = create_result_interactor

    @catch_exception
    def get(self, logged_user_id, result_id, *args, **kwargs):
        results = self.get_result_interactor.set_params(logged_user_id, result_id).execute()
        body = ResultSerializer.serialize(results)
        status = StatusCode.OK
        return body, status

    @catch_exception
    def post(self, logged_user_id, game_id, results, *args, **kwargs):
        body = self.create_result_interactor.set_params(
            logged_id=logged_user_id,
            game_id=game_id,
            results=results
        ).execute()
        status = StatusCode.CREATED
        return body, status


class ResultListView:
    def __init__(self, get_result_list_interactor):
        self.get_result_list_interactor = get_result_list_interactor

    @catch_exception
    def get(self, logged_user_id, student_id: int, page: int = 1, start_date=None, end_date=None, *args, **kwargs):
        results, available_date_range = self.get_result_list_interactor.set_params(
            logged_user_id=logged_user_id,
            student_id=student_id,
            page=page,
            start_date=start_date,
            end_date=end_date
        ).execute()
        serialized_results = ResultSerializer.list_serialize(results)
        body = {
            "available_date_range": available_date_range,
            "total": len(results),
            "results": serialized_results
        }
        status = StatusCode.OK
        return body, status
