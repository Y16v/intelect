import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import LinkMobileApp from '../../components/common/LinkMobileApp';
import {closeLinkMobileApp} from '../../actions/link-mobile-app/link-mobile-app';

const mapStateToProps = (state) => ({
  ...state.linkMobileApp,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    closeLinkMobileApp,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(LinkMobileApp);
