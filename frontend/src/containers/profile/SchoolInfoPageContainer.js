import {bindActionCreators} from 'redux';
import {connect as reduxConnect} from 'react-redux';

import {
  getSchoolAdmin,
  getSchoolTeachers,
  getSchoolStudents,
  retrieveSchool,
  updatePackage,
  updatePackageType,
  getPackageTypesForSchools,
  openUpdatePackageConfirmDialog,
  closeUpdatePackageConfirmDialog,
  openUpdatePackageTypeConfirmDialog,
  closeUpdatePackageTypeConfirmDialog,
  setUpdatePackageConfirmPassword,
  setUpdatePackageTypeConfirmPassword,
  setPackageTypeForUpgradeTariff,
} from '../../actions/super-admin/common';
import SchoolInfoPage from '../../components/profile/SchoolInfoPage';

const mapStateToProps = (state) => ({
  ...state.superAdminSchoolInfoPage,
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getSchoolAdmin,
    getSchoolTeachers,
    getSchoolStudents,
    retrieveSchool,
    updatePackage,
    updatePackageType,
    getPackageTypesForSchools,
    openUpdatePackageConfirmDialog,
    closeUpdatePackageConfirmDialog,
    openUpdatePackageTypeConfirmDialog,
    closeUpdatePackageTypeConfirmDialog,
    setUpdatePackageConfirmPassword,
    setUpdatePackageTypeConfirmPassword,
    setPackageTypeForUpgradeTariff,
  }, dispatch),
});
export default reduxConnect(mapStateToProps, mapDispatchToProps)(SchoolInfoPage);
