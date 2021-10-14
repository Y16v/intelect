import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import AlertDialog from '../../../components/games/modal/AlertDialogZeroing';
import * as alertZeroing from '../../../actions/games/modal/alert-dialog-zeroing';

const mapStateToProps = (state) => ({
  ...state.alertDialogZeroing,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({...alertZeroing}, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(AlertDialog);
