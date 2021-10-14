import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import SettingsGameAfterburnerModal from '../../../components/games/modal/SettingsGameAfterburnerModal';
import * as gameBurnerModal from '../../../actions/games/modal/game-afterburner';

const mapStateToProps = (state) => ({
  ...state.afterburnerGameModal, gameConfig: state.afterBurnerGame,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({...gameBurnerModal}, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(SettingsGameAfterburnerModal);
