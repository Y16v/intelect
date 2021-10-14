import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import UpdateTeacherProfile from '../../components/school_admin/UpdateTeacherProfile';
import * as updateTeacher from '../../actions/school/update-teacher';
import * as SchoolAdminActions from '../../actions/school/school_admin_page';
import getBaseActions from '../../actions/school/base';
import {UPDATE_TEACHER_ACTION} from '../../actions/school/update-teacher';
import {UPDATE_TEACHER} from '../../components/school_admin/constanta';

const mapStateToProps = (state) => ({
  ...state.updateTeacher,
  profile: state.schoolAdminPage,
  type: UPDATE_TEACHER,
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...updateTeacher,
    ...getBaseActions(UPDATE_TEACHER_ACTION),
    SchoolAdminActions,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(UpdateTeacherProfile);
