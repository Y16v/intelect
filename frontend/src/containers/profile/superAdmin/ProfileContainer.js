import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';

import {getCurrentUser} from '../../../actions/user/profile';
import SuperAdminProfile from '../../../components/profile/cards/SuperAdminProfile';


const mapStateToProps = (state) => ({
  profile: state.profile,
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getCurrentUser,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(SuperAdminProfile);
