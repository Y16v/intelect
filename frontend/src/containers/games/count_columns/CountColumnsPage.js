import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import CountColumnsPage from '../../../components/games/count-columns/CountColumnsPage';
import * as CountColumnsActions from '../../../actions/games/count-columns-game';
import {open as openSettingsModal} from '../../../actions/games/modal/game-count-columns';

const mapStateToProps = (state) => ({
  ...state.gameCountColumns,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({...CountColumnsActions, openSettingsModal}, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(CountColumnsPage);
