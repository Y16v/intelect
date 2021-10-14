import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import MainGamePage from '../../components/games/game_list/MainGamePage';
import games from '../../interactors/games';
import * as gameListActions from '../../actions/games/game-list';
import * as soundActions from '../../actions/games/sounds/games';

const mapStateToProps = (state) => ({
  games,
  state: state.gameList,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({...gameListActions, ...soundActions}, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(MainGamePage);
