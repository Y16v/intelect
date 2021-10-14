import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';
import {getCurrentUser} from '../../actions/user/profile';

import {getBaseActions} from '../../actions/school/create-update-group/base-actions';
import {ACTION_TYPE_PREFIX, editGroup, retrieveGroup} from '../../actions/school/create-update-group/edit-group';
import EditGroupPage from '../../components/school_admin/EditGroupPage';


const mapStateToProps = (state) => ({
  profile: state.profile,
  ...state.editGroup,
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...getBaseActions(ACTION_TYPE_PREFIX),
    getCurrentUser,
    retrieveGroup,
    editGroup,
  }, dispatch),
});


export default reduxConnect(mapStateToProps, mapDispatchToProps)(EditGroupPage);
