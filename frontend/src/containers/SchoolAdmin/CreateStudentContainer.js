import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import CreateStudent from '../../components/school_admin/CreateStudent';
import * as SchoolAdminActions from '../../actions/school/school_admin_page';
import getBaseActions from '../../actions/school/base';
import {CREATE_STUDENT_ACTION} from '../../actions/school/create-student';
import * as CreateStudentActions from '../../actions/school/create-student';
import {CREATE_STUDENT} from '../../components/school_admin/constanta';
import {getCurrentUser} from '../../actions/user/profile';

const mapStateToProps = (state) => ({
  ...state.createStudentPage,
  profile: state.schoolAdminPage,
  loggedUser: state.profile,
  isStudent: true,
  type: CREATE_STUDENT,
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...getBaseActions(CREATE_STUDENT_ACTION),
    ...CreateStudentActions,
    getCurrentUser,
    SchoolAdminActions,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(CreateStudent);
