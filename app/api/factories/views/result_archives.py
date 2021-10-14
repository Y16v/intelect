from api.factories.interactors.result_archive import StudentResultArchiveListInteractorFactory
from api.views.result_archive import StudentResultArchiveListView


class StudentResultArchiveListViewFactory:
    @staticmethod
    def create():
        student_result_archive_list_interactor = StudentResultArchiveListInteractorFactory.create()

        return StudentResultArchiveListView(
            student_result_archive_list_interactor=student_result_archive_list_interactor
        )
