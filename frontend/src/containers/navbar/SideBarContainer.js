import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import SideBar from '../../components/navbar/SideBar';
import {logout, pushToProfile} from '../../actions/login/login';
import {getCurrentUser} from '../../actions/user/profile';
import {pushToChangePassword} from '../../actions/user/change-password';
import {setLocale} from '../../actions/language-local/language-local';

const mapStateToProps = (state) => ({
  profile: state.profile,
  locale: state.languageLocal.lang,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    logout,
    getCurrentUser,
    pushToProfile,
    pushToChangePassword,
    setLocale,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(SideBar);
