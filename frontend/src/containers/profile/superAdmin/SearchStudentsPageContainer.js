import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';

import * as searchStudentActions from '../../../actions/super-admin/search-student-actions';

import SearchStudentsPage from '../../../components/profile/superAdmin/SearchStudentsPage';
import {
  closeStudentActionsMenu,
  finishUpdateStudentAccess,
  showStudentActionsMenu,
  updateStudentAccess,
} from '../../../actions/user/student';
import {redirectToEditStudent} from '../../../actions/user/teacherStudents';


const mapsStateToProps = (state) => ({
  ...state.searchStudents,
  actionMenuAttrs: state.teacherStudents.actionMenuAttrs,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...searchStudentActions,
    showStudentActionsMenu,
    closeStudentActionsMenu,
    updateStudentAccess,
    finishUpdateStudentAccess,
    redirectToEditStudent,
  }, dispatch),
});


export default reduxConnect(mapsStateToProps, mapDispatchToProps)(SearchStudentsPage);
