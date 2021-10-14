import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';

import {
  showSchoolActionsMenu,
  closeSchoolActionsMenu,
} from '../../../actions/super-admin/common';
import SuperAdminMainPage from '../../../components/profile/superAdmin/Main';
import {getCurrentUser} from '../../../actions/user/profile';
import {
  searchSchools,
  setPage,
  setPaginationCount,
  setSearchQueryValue,
} from '../../../actions/super-admin/search-schools';


const mapStateToProps = (state) => ({
  ...state.searchSchools,
  actionMenuAttrs: state.schools.actionMenuAttrs,
  profile: state.profile,
  loading: state.searchSchools.loading,
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    searchSchools,
    setSearchQueryValue,
    setPage,
    setPaginationCount,
    getCurrentUser,
    showSchoolActionsMenu,
    closeSchoolActionsMenu,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(SuperAdminMainPage);
