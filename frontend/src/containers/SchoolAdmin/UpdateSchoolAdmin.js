import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import UpdateSchoolAdmin from '../../components/school_admin/UpdateSchoolAdmin';
import * as updateSchoolAdmin from '../../actions/school/update-school-admin';
import {UPDATE_SCHOOL_ADMIN} from '../../actions/school/update-school-admin';
import * as SchoolAdminActions from '../../actions/school/school_admin_page';
import getBaseActions from '../../actions/school/base';
import {UPDATE_TEACHER} from '../../components/school_admin/constanta';

const mapStateToProps = (state) => ({
  ...state.updateSchoolAdmin,
  profile: state.schoolAdminPage,
  type: UPDATE_TEACHER,
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...updateSchoolAdmin,
    ...getBaseActions(UPDATE_SCHOOL_ADMIN),
    SchoolAdminActions,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(UpdateSchoolAdmin);
