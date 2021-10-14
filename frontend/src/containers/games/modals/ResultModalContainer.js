import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import ResultModal from '../../../components/games/modal/ResultModal';
import * as resultModalActions from '../../../actions/games/modal/result-modal';
import {onSubmitResult} from '../../../actions/games/after_burner_game';

const mapStateToProps = (state) => ({
  ...state.resultModal, allResults: state.afterBurnerGame.results,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...resultModalActions,
    onSubmitResult,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(ResultModal);
