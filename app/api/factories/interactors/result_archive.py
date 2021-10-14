from api.factories.repositories.archives import ResultArchiveRepoFactory
from api.factories.validators.user_permission_validator import UserPermissionValidatorFactory
from api.interactors.result_archives import StudentResultArchiveListInteractor


class StudentResultArchiveListInteractorFactory:
    @staticmethod
    def create():
        result_archive_repo = ResultArchiveRepoFactory.create()
        user_permission_validator = UserPermissionValidatorFactory.create()

        return StudentResultArchiveListInteractor(
            result_archive_repo=result_archive_repo,
            user_permission_validator=user_permission_validator
        )
