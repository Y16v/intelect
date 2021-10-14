from api.factories.interactors.winner import WinnersListInteractorFactory
from api.views.winner import WinnersListView


class WinnersListViewFactory:
    @staticmethod
    def create():
        winners_list_interactor = WinnersListInteractorFactory.create()

        return WinnersListView(
            winners_list_interactor=winners_list_interactor
        )
