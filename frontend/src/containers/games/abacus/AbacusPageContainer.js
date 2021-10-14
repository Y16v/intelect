import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import AbacusPage from '../../../components/games/abacus/AbacusPage';
import * as AbacusActions from '../../../actions/games/abacus';


const mapStateToProps = (state) => ({
  ...state.abacus,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...AbacusActions,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(AbacusPage);
