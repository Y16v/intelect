import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import GeneratorGamePage from '../../../components/games/generator-game/GeneratorGamePage';
import * as GameActions from '../../../actions/games/generator-game';
import {open as openSettingsModal} from '../../../actions/games/modal/generator-game';

const mapStateToProps = (state) => ({
  ...state.generatorGame,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...GameActions,
    openSettingsModal,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(GeneratorGamePage);
