import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';

import {
  createNewOrUpdateSchoolWithAdmin,
  getSchoolAdmin,
  getSchoolWithAdmin,
  retrieveSchool,
  setSchoolAdminValue,
  setSchoolValue,
  finishUpdateOrCreate,
} from '../../../actions/super-admin/common';
import CreateNewOrUpdateSchoolCard from '../../../components/profile/cards/CreateOrUpdateNewSchoolCard';

const mapStateToProps = (state) => ({
  newSchool: state.newOrUpdateSchoolAndAdmin.newSchool,
  newSchoolAdmin: state.newOrUpdateSchoolAndAdmin.newSchoolAdmin,
  school: state.schools.retrieveSchool,
  schoolAdmin: state.schools.schoolAdminToShow,
  error: state.newOrUpdateSchoolAndAdmin.error,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    createNewOrUpdateSchoolWithAdmin,
    getSchoolAdmin,
    retrieveSchool,
    getSchoolWithAdmin,
    setSchoolValue,
    setSchoolAdminValue,
    finishUpdateOrCreate,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(CreateNewOrUpdateSchoolCard);
