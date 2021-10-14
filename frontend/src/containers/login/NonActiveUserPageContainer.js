import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';

import NonActivatedUserPage from '../../components/login/NonActivatedUserPage';
import {logout} from '../../actions/login/login';

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    logout,
  }, dispatch),
});

export default reduxConnect(undefined, mapDispatchToProps)(NonActivatedUserPage);
