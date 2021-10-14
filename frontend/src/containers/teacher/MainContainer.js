import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import MainPage from '../../components/profile/teacher/Main';
import {getCurrentUser} from '../../actions/user/profile';
import * as searchStudentActions from '../../actions/super-admin/search-student-actions';
import {
  closeStudentActionsMenu,
  finishUpdateStudentAccess,
  showStudentActionsMenu,
  updateStudentAccess,
  deleteStudentAccess,
} from '../../actions/user/student';
import {getTeacher, redirectToEditStudent} from '../../actions/user/teacherStudents';
import {closeGroupActionMenu, deleteGroup, showGroupActionMenu} from '../../actions/school/group';


const mapStateToProps = (state) => ({
  searchStudent: state.searchStudents,
  loggedUser: state.profile,
  teacher: state.teacherStudents.teacher,
  getTeacherError: state.teacherStudents.getTeacherError,
  school: state.schoolAdminPage.school,
  studentActionMenuAttrs: state.teacherStudents.actionMenuAttrs,
  groupActionMenuAttrs: state.teacherProfilePage.groupActionMenuAttrs,

});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...searchStudentActions,
    getCurrentUser,
    getTeacher,
    closeStudentActionsMenu,
    finishUpdateStudentAccess,
    showStudentActionsMenu,
    updateStudentAccess,
    deleteStudentAccess,
    redirectToEditStudent,
    showGroupActionMenu,
    closeGroupActionMenu,
    deleteGroup,
  }, dispatch),
});


export default reduxConnect(mapStateToProps, mapDispatchToProps)(MainPage);
