from api.factories.views.auth import AuthViewFactory, LoadActiveUserViewFactory
from api.factories.views.group import SchoolGroupsListCreateViewFactory, SchoolGroupRetrieveUpdateDeleteViewFactory
from api.factories.views.package_type import PackageTypeListViewFactory
from api.factories.views.proposals import PackageProposalListCreateViewFactory, UpdatePackageProposalStatusViewFactory
from api.factories.views.result import ResultViewFactory, ResultListViewFactory
from api.factories.views.result_archives import StudentResultArchiveListViewFactory
from api.factories.views.school import SchoolListCreateViewFactory, SchoolRetrieveUpdateDeleteViewFactory, \
    UpdateSchoolPackageTypeViewFactory, UpdateSchoolPackageViewFactory, SearchSchoolsViewFactory
from api.factories.views.school_admin import SchoolAdminCreateViewFactory, SchoolAdminRetrieveUpdateViewFactory
from api.factories.views.student import (
    SchoolStudentsListCreateViewFactory,
    SchoolStudentRetrieveUpdateDeleteViewFactory,
    GetStudentPasswordViewFactory, GetRatingStudentsViewFactory, SchoolStudentUpdateAccessViewFactory,
    SearchStudentsViewFactory)
from api.factories.views.teachers import TeachersViewFactory, SchoolTeacherRetrieveUpdateViewFactory, \
    SchoolTeacherUpdateAccessViewFactory
from api.factories.views.user import GetCurrentUserViewFactory, UserChangePasswordViewFactory, \
    ChangeChildPasswordViewFactory, RetrieveUserViewFactory
from api.factories.views.winners import WinnersListViewFactory
from api.view_wrapper import ViewWrapper
from django.urls import path
from api.views import version

app_name = 'api'

urlpatterns = [
    path('login', ViewWrapper.as_view(view_factory=AuthViewFactory), name='users_login'),
    path('users/<int:user_id>', ViewWrapper.as_view(view_factory=RetrieveUserViewFactory), name='retrieve_user'),
    path('users/current', ViewWrapper.as_view(view_factory=GetCurrentUserViewFactory), name='users_current'),
    path('users/current/change_password',
         ViewWrapper.as_view(view_factory=UserChangePasswordViewFactory),
         name='users_current_change_password'
         ),
    path('users/change_child_password',
         ViewWrapper.as_view(view_factory=ChangeChildPasswordViewFactory),
         name='users_change_password'
         ),
    path('users/search_students', ViewWrapper.as_view(view_factory=SearchStudentsViewFactory), name='search_students'),
    path('load_active_user', ViewWrapper.as_view(view_factory=LoadActiveUserViewFactory), name='retrieve_active_user'),
    path('package_types', ViewWrapper.as_view(view_factory=PackageTypeListViewFactory), name='package_types_list'),

    path('schools', ViewWrapper.as_view(view_factory=SchoolListCreateViewFactory), name='schools_list_create'),
    path('schools/search', ViewWrapper.as_view(view_factory=SearchSchoolsViewFactory), name='schools_search'),
    path('schools/<int:school_pk>',
         ViewWrapper.as_view(view_factory=SchoolRetrieveUpdateDeleteViewFactory),
         name='school_retrieve_update_delete'
         ),
    path('schools/package_proposals', ViewWrapper.as_view(view_factory=PackageProposalListCreateViewFactory)),
    path('schools/package_proposals/<int:package_proposal_id>/update_status',
         ViewWrapper.as_view(view_factory=UpdatePackageProposalStatusViewFactory)),

    path('schools/<int:school_id>/update_package',
         ViewWrapper.as_view(view_factory=UpdateSchoolPackageViewFactory),
         name='school_update_package'),
    path('schools/<int:school_id>/update_package_type',
         ViewWrapper.as_view(view_factory=UpdateSchoolPackageTypeViewFactory),
         name='school_update_package_type'
         ),

    path('school_admins',
         ViewWrapper.as_view(view_factory=SchoolAdminCreateViewFactory),
         name='school_admins_create'
         ),
    path('school_admins/<int:school_admin_pk>',
         ViewWrapper.as_view(view_factory=SchoolAdminRetrieveUpdateViewFactory),
         name='school_admin_retrieve_update'
         ),

    path('schools/<int:school_pk>/teachers',
         ViewWrapper.as_view(view_factory=TeachersViewFactory),
         name='school_teachers_list'
         ),
    path('schools/<int:school_pk>/students',
         ViewWrapper.as_view(view_factory=SchoolStudentsListCreateViewFactory),
         name='school_students_list'
         ),
    path('schools/<int:school_id>/groups', ViewWrapper.as_view(view_factory=SchoolGroupsListCreateViewFactory)),
    path('schools/<int:school_id>/groups/<int:group_id>',
         ViewWrapper.as_view(view_factory=SchoolGroupRetrieveUpdateDeleteViewFactory),
         name='school_group_retrieve_update_delete'
         ),
    path(
        'schools/<int:school_pk>/teachers/<int:teacher_pk>',
        ViewWrapper.as_view(view_factory=SchoolTeacherRetrieveUpdateViewFactory),
        name='school_teacher_retrieve_update'
    ),
    path('schools/<int:school_pk>/teachers/<int:teacher_pk>/update_access',
         ViewWrapper.as_view(view_factory=SchoolTeacherUpdateAccessViewFactory),
         name='school_teacher_update_access'
    ),
    path(
        'schools/<int:school_pk>/students/<int:student_pk>',
        ViewWrapper.as_view(view_factory=SchoolStudentRetrieveUpdateDeleteViewFactory),
        name='school_student_retrieve_update'
    ),
    path(
        'schools/<int:school_pk>/students/<int:student_pk>/update_access',
        ViewWrapper.as_view(view_factory=SchoolStudentUpdateAccessViewFactory),
        name='school_student_update_access'
    ),
    path('schools/<int:school_pk>/students/<int:student_pk>/password',
         ViewWrapper.as_view(view_factory=GetStudentPasswordViewFactory),
         name='school_student_reset_password'
         ),
    path('students/<int:student_id>/result_archives',
         ViewWrapper.as_view(view_factory=StudentResultArchiveListViewFactory)),
    path('result', ViewWrapper.as_view(view_factory=ResultViewFactory), name='results_create'),
    path('results', ViewWrapper.as_view(view_factory=ResultListViewFactory), name='results_list'),
    path('rating_students', ViewWrapper.as_view(view_factory=GetRatingStudentsViewFactory), name='students_ordered_by_rating'),
    path('winners', ViewWrapper.as_view(view_factory=WinnersListViewFactory), name='winners_list'),
    path('get-version', version.get_version)

]
