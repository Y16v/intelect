import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import UpdateStudentProfile from '../../components/school_admin/UpdateStudentProfile';
import getBaseActions from '../../actions/school/base';
import * as UpdateStudentActions from '../../actions/school/update-student';
import * as SchoolAdminActions from '../../actions/school/school_admin_page';
import {UPDATE_STUDENT} from '../../components/school_admin/constanta';
import {UPDATE_STUDENT_ACTION} from '../../actions/school/update-student';
import {getCurrentUser} from '../../actions/user/profile';


const mapStateToProps = (state) => ({
  ...state.updateStudent,
  profile: state.schoolAdminPage,
  loggedUser: state.profile,
  isStudent: true,
  type: UPDATE_STUDENT,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...getBaseActions(UPDATE_STUDENT_ACTION),
    ...UpdateStudentActions,
    getCurrentUser,
    SchoolAdminActions,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(UpdateStudentProfile);
