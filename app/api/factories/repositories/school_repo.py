from api.repositories.school_repo import SchoolRepo
from api.factories.entities.school import SchoolEntityFactory


class SchoolRepoFactory:
    @staticmethod
    def create():
        school_entity = SchoolEntityFactory.create()

        return SchoolRepo(
            school_entity=school_entity
        )
