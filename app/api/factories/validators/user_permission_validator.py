from api.factories.repositories.group import GroupRepoFactory
from api.factories.repositories.proposals import PackageProposalRepoFactory
from api.factories.repositories.school_repo import SchoolRepoFactory
from api.factories.repositories.user_repo import UserCategoryRepoFactory, UserRepoFactory
from api.validators.user_permission_validator import UserPermissionValidator


class UserPermissionValidatorFactory:
    @staticmethod
    def create():
        user_repo = UserRepoFactory.create()
        school_repo = SchoolRepoFactory.create()
        group_repo = GroupRepoFactory.create()
        user_category_repo = UserCategoryRepoFactory.create()
        package_proposal_repo = PackageProposalRepoFactory.create()

        return UserPermissionValidator(
            user_repo=user_repo,
            school_repo=school_repo,
            group_repo=group_repo,
            user_category_repo=user_category_repo,
            package_proposal_repo=package_proposal_repo
        )
