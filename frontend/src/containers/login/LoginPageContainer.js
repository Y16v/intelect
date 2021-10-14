import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import LoginPage from '../../components/login/LoginPage';
import * as loginActions from '../../actions/login/login';

const mapStateToProps = (state) => ({
  state: state.login,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({...loginActions}, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(LoginPage);
