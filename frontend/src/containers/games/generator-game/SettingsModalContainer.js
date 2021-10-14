import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import SettingsModal from '../../../components/games/generator-game/SettingsModal';
import * as settingsActions from '../../../actions/games/modal/generator-game';

const mapStateToProps = (state) => ({
  ...state.generatorGameModal, gameConfig: state.generatorGame,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...settingsActions,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(SettingsModal);
