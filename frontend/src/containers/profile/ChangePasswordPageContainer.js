import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';

import * as changePasswordActions from '../../actions/user/change-password';
import ChangePasswordPage from '../../components/profile/ChangePasswordPage';


const mapStateToProps = (state) => ({
  ...state.changePassword,
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...changePasswordActions,
  }, dispatch),
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(ChangePasswordPage);
