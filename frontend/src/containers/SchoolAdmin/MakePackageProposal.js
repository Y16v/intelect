import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import MakePackageProposalPage from '../../components/school_admin/MakePackageProposalPage';
import {
  cancelPackageProposal,
  getLoggedUserSchool,
  getPackageTypesForUpgrade,
  getSchoolPackageProposalsHistory,
  makeUpdatePackageProposal,
  makeUpgradePackageProposal,
  setPage,
  setPaginationCount,
  setProposalTypeTab,
} from '../../actions/school/make-package-proposal';
import {retrieveSchool} from '../../actions/super-admin/common';


const mapStateToProps = (state) => ({
  loggedUser: state.profile,
  ...state.makePackageProposal,
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    setProposalTypeTab,
    makeUpgradePackageProposal,
    getPackageTypesForUpgrade,
    retrieveSchool,
    getLoggedUserSchool,
    makeUpdatePackageProposal,
    setPage,
    setPaginationCount,
    getSchoolPackageProposalsHistory,
    cancelPackageProposal,
  }, dispatch),
});


export default reduxConnect(mapStateToProps, mapDispatchToProps)(MakePackageProposalPage);
