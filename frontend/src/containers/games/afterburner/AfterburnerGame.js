import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import AfterburnerGame from '../../../components/games/afterburner/AfterburnerGame';
import * as gameActions from '../../../actions/games/after_burner_game';
import {countdownSound, pipSound} from '../../../actions/games/sounds/games';
import {open as openSettingsModal} from '../../../actions/games/modal/game-afterburner';
import {open as openAllResultsModal} from '../../../actions/games/modal/result-modal';

const mapStateToProps = (state) => ({
  ...state.afterBurnerGame,
  isOpenModal: state.afterburnerGameModal.isOpen,
  font: state.afterburnerGameModal.font,
  isSubmitLoading: state.resultModal.isSubmitLoading,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...gameActions,
    pipSound,
    countdownSound,
    openSettingsModal,
    openAllResultsModal,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(AfterburnerGame);
