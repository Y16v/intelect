import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import * as packageProposalActions from '../../../actions/super-admin/package-proposals';
import PackageProposalsPage from '../../../components/profile/superAdmin/PackageProposalsPage';


const mapStateToProps = (state) => ({
  ...state.superAdminPackageProposals,
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...packageProposalActions,
  }, dispatch),
});


export default reduxConnect(mapStateToProps, mapDispatchToProps)(PackageProposalsPage);
