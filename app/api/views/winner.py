from api.exceptions.decorators import catch_exception
from api.serializers.winner import WinnerSerializer
from api.status_code import StatusCode
from api.views.base import View


class WinnersListView(View):
    def __init__(self, winners_list_interactor):
        self.winners_list_interactor = winners_list_interactor

    @catch_exception
    def get(self, logged_user_id, year=None, month=None, with_student=False, *args, **kwargs):
        winners = self.winners_list_interactor.set_params(
            logged_user_id=logged_user_id,
            year=year,
            month=month,
            with_student=with_student,
        ).execute()

        return WinnerSerializer.serialize_list(winners), StatusCode.OK
