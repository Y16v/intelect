import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import * as studentRatingActions from '../../../actions/games/rating/student-rating-actions';
import * as searchStudentActions from '../../../actions/super-admin/search-student-actions';
import {getCurrentUser} from '../../../actions/user/profile';

import MainRatings from '../../../components/games/rating/MainRatings';

const mapStateToProps = (state) => ({
  profile: state.profile,
  searchStudents: state.searchStudents,
  ...state.ratings,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...studentRatingActions,
    ...searchStudentActions,
    getCurrentUser,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(MainRatings);
