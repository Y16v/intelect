import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import Layout from '../components/Layout';

const mapStateToProps = (state) => ({
  version: state.profile.version,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({}, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(Layout);
