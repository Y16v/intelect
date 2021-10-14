import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import {logout} from '../../actions/login/login';
import NavBar from '../../components/profile/NavBar';
import {getCurrentUser} from '../../actions/user/profile';
import {setLocale} from '../../actions/language-local/language-local';


const mapStateToProps = (state) => ({
  profile: state.profile,
  locale: state.languageLocal.lang,
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getCurrentUser,
    logout,
    setLocale,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(NavBar);
