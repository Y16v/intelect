import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';

import TeacherPersonalData from '../../../components/profile/cards/TeacherPersonalData';
import {getCurrentUser} from '../../../actions/user/profile';
import {getTeacherStudents, redirectToEditStudent} from '../../../actions/user/teacherStudents';
import {getTeacherPersonalDate} from '../../../actions/user/teacher-personal-date';

const mapStateToProps = (state) => ({
  user: state.teacherPersonalDate,
  students: state.teacherStudents.data,
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getCurrentUser,
    getTeacherStudents,
    redirectToEditStudent,
    getTeacherPersonalDate,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(TeacherPersonalData);
