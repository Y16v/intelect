import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import ChartResult from '../../../components/profile/teacher/ChartResult';


const mapStateToProps = (state) => ({
  ...state.chartResult,
  loading: state.chartResult,
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(ChartResult);
