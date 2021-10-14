from api.factories.interactors.result import AfterburnerResultCreateInteractorFactory, GetResultInteractorFactory, \
    GetResultListFactory, MultiplyDivisionSquareCubeResultCreateInteractorFactory
from api.models.constants import Game
from api.views.result import ResultView, ResultListView


class ResultViewFactory:
    INTERACTORS = {}
    INTERACTORS[Game.AFTERBURNER.id] = AfterburnerResultCreateInteractorFactory
    INTERACTORS[Game.MULTIPLY_DIVISION_SQUARE_CUBE.id] = MultiplyDivisionSquareCubeResultCreateInteractorFactory
    INTERACTORS[Game.COUNT_COLUMNS.id] = AfterburnerResultCreateInteractorFactory

    @staticmethod
    def create(request=None, *args, **kwargs):
        create_result_interactor = None
        if request and request.method == 'POST':
            game_id = request.data.get('game_id', None)
            create_result_interactor = ResultViewFactory.INTERACTORS[game_id].create()

        get_result_interactor = GetResultInteractorFactory.create()
        return ResultView(
            get_result_interactor=get_result_interactor,
            create_result_interactor=create_result_interactor
        )


class ResultListViewFactory:
    @staticmethod
    def create(*args, **kwargs):
        get_list_result_interactor = GetResultListFactory.create()
        return ResultListView(get_list_result_interactor)
