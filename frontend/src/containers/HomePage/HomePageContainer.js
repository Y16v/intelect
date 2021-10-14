import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import HomePage from '../../components/Home/HomePage';
import {logout, pushToGames} from '../../actions/login/login';
import {pushToChangePassword} from '../../actions/user/change-password';

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    logout,
    pushToGames,
    pushToChangePassword,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(HomePage);
