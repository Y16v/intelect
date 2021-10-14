import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';

import * as searchStudentActions from '../../actions/super-admin/search-student-actions';
import {
  closeStudentActionsMenu,
  finishUpdateStudentAccess,
  showStudentActionsMenu,
  updateStudentAccess,
} from '../../actions/user/student';
import {getCurrentUser} from '../../actions/user/profile';
import {redirectToEditStudent} from '../../actions/user/teacherStudents';

import SearchStudentsPage from '../../components/school_admin/SchoolSearchStudents';


const mapsStateToProps = (state) => ({
  ...state.searchStudents,
  profile: state.profile,
  actionMenuAttrs: state.teacherStudents.actionMenuAttrs,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...searchStudentActions,
    getCurrentUser,
    closeStudentActionsMenu,
    finishUpdateStudentAccess,
    showStudentActionsMenu,
    updateStudentAccess,
    redirectToEditStudent,
  }, dispatch),
});


export default reduxConnect(mapsStateToProps, mapDispatchToProps)(SearchStudentsPage);
