from api.factories.entities.winner import WinnerEntityFactory
from api.repositories.winner_repo import WinnerRepo


class WinnerRepoFactory:
    @staticmethod
    def create():
        winner_entity = WinnerEntityFactory.create()

        return WinnerRepo(
            winner_entity=winner_entity
        )
