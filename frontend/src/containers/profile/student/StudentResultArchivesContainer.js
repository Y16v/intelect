import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import StudentResultArchivesPage from '../../../components/profile/studentPrifile/StudentResultArchivesPage';
import * as studentResultArchives from '../../../actions/school/student-result-archive';

const mapStateToProps = (state) => ({
  ...state.studentResultArchives,
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...studentResultArchives,
  }, dispatch),
});

export default reduxConnect(mapStateToProps, mapDispatchToProps)(StudentResultArchivesPage);
