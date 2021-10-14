import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import Multiplier from '../../../components/games/ multiplier/Multiplier';
import * as multiplierActions from '../../../actions/games/multiplier';

const mapStateToProps = (state) => ({
  ...state.multiplier,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...multiplierActions,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(Multiplier);
