import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import {getCurrentUser} from '../../actions/user/profile';

import {getBaseActions} from '../../actions/school/create-update-group/base-actions';
import {
  ACTION_TYPE_PREFIX,
  createGroup,
  getTeacherProfile,
} from '../../actions/school/create-update-group/create-group';

import CreateGroupPage from '../../components/school_admin/CreateGroupPage';


const mapStateToProps = (state) => ({
  profile: state.profile,
  ...state.createGroup,
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...getBaseActions(ACTION_TYPE_PREFIX),
    getCurrentUser,
    createGroup,
    getTeacherProfile,
  }, dispatch),
});


export default reduxConnect(mapStateToProps, mapDispatchToProps)(CreateGroupPage);
