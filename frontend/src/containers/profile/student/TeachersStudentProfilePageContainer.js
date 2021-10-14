import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';

import {
  closeResultItemsDialog,
  getStudentResults,
  openResultItemsDialog,
  retrieveResult,
  setDialogToPrint,
  setResultsDateRange,
  getStudent,
} from '../../../actions/user/student';
import StudentPage from '../../../components/profile/teacher/StudentPage';

const mapStateToProps = (state) => ({
  ...state.studentResults,
  loading: state.studentResults,
  lookUpStudent: state.lookUpStudent,
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getStudentResults,
    retrieveResult,
    setDialogToPrint,
    setResultsDateRange,
    openResultItemsDialog,
    closeResultItemsDialog,
    getStudent,
  }, dispatch),
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(StudentPage);
