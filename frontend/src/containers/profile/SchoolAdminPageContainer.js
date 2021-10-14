import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import SchoolAdminPage from '../../components/school_admin/SchoolAdminPage';
import * as SchoolAdminActions from '../../actions/school/school_admin_page';

const mapStateToProps = (state) => ({
  ...state.schoolAdminPage,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...SchoolAdminActions,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(SchoolAdminPage);
