import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import NavBarGame from '../../../components/navbarGame/navbarGame';
import * as NavbarActions from '../../../actions/games/modal/navbar-game-actions';
import {open as openSettingsModal} from '../../../actions/games/modal/game-afterburner';
import {open as openAlertDialog} from '../../../actions/games/modal/alert-dialog-zeroing';
import {open as openResultModal} from '../../../actions/games/modal/result-modal';
const mapStateToProps = (state) => ({
  ...state.navBarGame, state: state.alertDialogZeroing, game: state.afterBurnerGame,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({...NavbarActions, openSettingsModal, openAlertDialog, openResultModal}, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(NavBarGame);
