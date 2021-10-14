import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import SettingsGameCountColumnModal from '../../../components/games/modal/GameCountColumnsModal';
import * as gameColumnsModal from '../../../actions/games/modal/game-count-columns';

const mapStateToProps = (state) => ({
  ...state.gameCountColumnsModal,
  gameConfig: state.gameCountColumns,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({...gameColumnsModal}, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(SettingsGameCountColumnModal);
