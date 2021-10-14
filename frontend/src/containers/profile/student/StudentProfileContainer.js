import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';

import StudentProfile from '../../../components/profile/cards/StudentProfile';
import {getStudent, hideStudentAccesses, showStudentAccesses} from '../../../actions/user/student';

const mapStateToProps = (state) => ({
  lookUpStudent: {...state.lookUpStudent},
  school: state.schoolAdminPage.school,
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getStudent,
    showStudentAccesses,
    hideStudentAccesses,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(StudentProfile);
