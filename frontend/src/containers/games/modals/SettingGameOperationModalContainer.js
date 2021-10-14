import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import operations from '../../../interactors/operations';
import SettingGamesOperationModal from '../../../components/games/modal/SettingGameOperationModal';
import * as SettingOperationModal from '../../../actions/games/modal/settings-game-operation-modal';


const mapStateToProps = (state) => ({
  ...state.operationGameModal,
  operations,
  gameConfig: state.multiplier,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...SettingOperationModal,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(SettingGamesOperationModal);
