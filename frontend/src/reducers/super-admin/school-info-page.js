import {merge} from 'extend-merge';
import createReducer from '../utils/base';

import {
  RETRIEVE_SCHOOL_SUCCESS,
  RETRIEVE_SCHOOL_FAIL,
  GET_SCHOOL_ADMIN_SUCCESS,
  GET_SCHOOL_ADMIN_FAIL,
  GET_SCHOOL_TEACHERS_SUCCESS,
  GET_SCHOOL_TEACHERS_FAIL,
  GET_SCHOOL_STUDENTS_SUCCESS,
  GET_SCHOOL_STUDENTS_FAIL,
  UPDATE_SCHOOL_PACKAGE_SUCCESS,
  UPDATE_SCHOOL_PACKAGE_TYPE_SUCCESS,
  UPDATE_SCHOOL_PACKAGE_FAIL,
  UPDATE_SCHOOL_PACKAGE_TYPE_FAIL,
  OPEN_UPDATE_PACKAGE_CONFIRM_DIALOG,
  CLOSE_UPDATE_PACKAGE_CONFIRM_DIALOG,
  OPEN_UPDATE_PACKAGE_TYPE_CONFIRM_DIALOG,
  CLOSE_UPDATE_PACKAGE_TYPE_CONFIRM_DIALOG,
  SET_UPDATE_PACKAGE_CONFIRM_PASSWORD,
  SET_UPDATE_PACKAGE_TYPE_CONFIRM_PASSWORD,
  GET_FOR_SCHOOLS_PACKAGE_TYPES_SUCCESS, SET_PACKAGE_TYPE_FOR_UPGRADE_TARIFF,
} from '../../actions/super-admin/common';

const INITIAL_STATE = {
  school: {},
  schoolAdmin: {},
  teachers: [],
  students: [],
  packageTypesForUpgradeTariff: [],
  selectedPackageTypeForUpgrade: {},
  updatedPackage: 0,
  isConfirmUpdatePackage: false,
  updatePackageConfirmPassword: '',
  updatePackageTypeConfirmPassword: '',
  selectedPackageTypeToUpgrade: {},
  isConfirmUpdatePackageType: false,
  retrieveSchoolError: '',
  retrieveSchoolAdminError: '',
  getSchoolTeachersError: '',
  getSchoolStudentsError: '',
  updateSchoolPackageError: '',
  updatePackageTypeError: '',
};


export default createReducer({
  [RETRIEVE_SCHOOL_SUCCESS]: (state, action) => ({
    ...state,
    school: action.school,
  }),
  [RETRIEVE_SCHOOL_FAIL]: (state, action) => merge({}, state, {retrieveSchoolError: action.error}),
  [GET_SCHOOL_ADMIN_SUCCESS]: (state, action) => ({...state, schoolAdmin: action.schoolAdmin}),
  [GET_SCHOOL_ADMIN_FAIL]: (state, action) => merge({}, state, {retrieveSchoolAdminError: action.error}),
  [GET_SCHOOL_TEACHERS_SUCCESS]: (state, action) => ({
    ...state,
    teachers: action.teachers,
  }),
  [GET_SCHOOL_TEACHERS_FAIL]: (state, action) => merge({}, state, {getSchoolTeachersError: action.error}),
  [GET_SCHOOL_STUDENTS_SUCCESS]: (state, action) => ({
    ...state,
    students: action.students,
  }),
  [GET_SCHOOL_STUDENTS_FAIL]: (state, action) => merge({}, state, {getSchoolStudentsError: action.error}),
  [GET_FOR_SCHOOLS_PACKAGE_TYPES_SUCCESS]: (state, action) => ({
    ...state,
    packageTypesForUpgradeTariff: action.packageTypes,
  }),
  [SET_PACKAGE_TYPE_FOR_UPGRADE_TARIFF]: (state, action) => ({
    ...state,
    selectedPackageTypeForUpgrade: action.packageType,
  }),
  [OPEN_UPDATE_PACKAGE_CONFIRM_DIALOG]: (state, action) => merge({}, state, {isConfirmUpdatePackage: true}),
  [UPDATE_SCHOOL_PACKAGE_SUCCESS]: (state, action) => ({
    ...state,
    updatedPackage: action.updatedPackage,
  }),
  [SET_UPDATE_PACKAGE_CONFIRM_PASSWORD]: (state, action) => merge({}, state, {updatePackageConfirmPassword: action.password}),
  [CLOSE_UPDATE_PACKAGE_CONFIRM_DIALOG]: (state, action) => merge({}, state, {isConfirmUpdatePackage: false}),
  [UPDATE_SCHOOL_PACKAGE_FAIL]: (state, action) => merge({}, state, {updateSchoolPackageError: action.error}),
  [OPEN_UPDATE_PACKAGE_TYPE_CONFIRM_DIALOG]: (state, action) => merge({}, state, {isConfirmUpdatePackageType: true}),
  [CLOSE_UPDATE_PACKAGE_TYPE_CONFIRM_DIALOG]: (state, action) => merge({}, state, {isConfirmUpdatePackageType: false}),
  [SET_UPDATE_PACKAGE_TYPE_CONFIRM_PASSWORD]: (state, action) => merge({}, state, {updatePackageTypeConfirmPassword: action.password}),
  [UPDATE_SCHOOL_PACKAGE_TYPE_SUCCESS]: (state, action) => ({
    ...state,
    updatedPackage: action.updatedPackage,
  }),
  [UPDATE_SCHOOL_PACKAGE_TYPE_FAIL]: (state, action) => merge({}, state, {updatePackageTypeError: action.error}),
}, INITIAL_STATE);
