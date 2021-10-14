from api.factories.repositories.winner import WinnerRepoFactory
from api.interactors.winner import WinnersListInteractor
from api.factories.repositories.school_repo import SchoolRepoFactory
from api.factories.repositories.user_repo import UserRepoFactory


class WinnersListInteractorFactory:
    @staticmethod
    def create():
        winner_repo = WinnerRepoFactory.create()
        user_repo = UserRepoFactory.create()
        school_repo = SchoolRepoFactory.create()

        return WinnersListInteractor(
            winner_repo=winner_repo,
            user_repo=user_repo,
            school_repo=school_repo
        )
