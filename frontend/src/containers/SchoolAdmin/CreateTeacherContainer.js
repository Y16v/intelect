import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import CreateTeacherPage from '../../components/school_admin/CreateTeacherPage';
import * as createTeacherPage from '../../actions/school/create-teacher-page';
import * as SchoolAdminActions from '../../actions/school/school_admin_page';
import getBaseActions from '../../actions/school/base';
import {CREATE_TEACHER_PAGE} from '../../actions/school/create-teacher-page';
import {CREATE_TEACHER} from '../../components/school_admin/constanta';

const mapStateToProps = (state) => ({
  ...state.createTeacherPage,
  profile: state.schoolAdminPage,
  type: CREATE_TEACHER,
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...createTeacherPage,
    ...getBaseActions(CREATE_TEACHER_PAGE),
    SchoolAdminActions,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(CreateTeacherPage);
