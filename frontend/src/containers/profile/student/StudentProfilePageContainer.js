import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';

import StudentProfilePage from '../../../components/profile/studentPrifile/StudentProfilePage';
import * as StudentProfilePageAction from '../../../actions/student-profile-page/student-profile-page';
import {
  closeResultItemsDialog,
  getStudentResults,
  openResultItemsDialog,
  setResultsDateRange,
} from '../../../actions/user/student';

const mapStateToProps = (state) => ({
  ...state.studentProfilePage,
  lookUpStudent: {...state.lookUpStudent},
  studentResults: {...state.studentResults},
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...StudentProfilePageAction,
    openResultItemsDialog,
    closeResultItemsDialog,
    getStudentResults,
    setResultsDateRange,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(StudentProfilePage);
