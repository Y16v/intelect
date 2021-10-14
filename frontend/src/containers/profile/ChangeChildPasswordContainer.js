import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';

import {
  changeChildPassword,
  setNewPasswordValue,
  setConfirmPasswordValue,
  finishChangePassword,
  showNewPassword,
  hideNewPassword,
  showConfirmPassword,
  hideConfirmPassword,
  getChildUser,
} from '../../actions/user/change-child-password';
import ChangeChildPasswordPage from '../../components/profile/common/ChangeChildPasswordPage';


const mapStateToProps = (state) => ({
  ...state.changeChildPassword,
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    changeChildPassword,
    setNewPasswordValue,
    setConfirmPasswordValue,
    finishChangePassword,
    showNewPassword,
    hideNewPassword,
    showConfirmPassword,
    hideConfirmPassword,
    getChildUser,
  }, dispatch),
});


export default reduxConnect(mapStateToProps, mapDispatchToProps)(ChangeChildPasswordPage);
