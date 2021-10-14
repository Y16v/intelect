import {combineReducers} from 'redux';
import notifyReducer from 'react-redux-notify';
import login from './login/login';
import profile from './user/profile';
import changePassword from './user/change-password';
import teacherStudents from './user/teacher-students';
import gameList from './games/game-list';
import gameCountColumns from './games/game-count-columns';
import gameCountColumnsModal from './games/modal/game-count-columns';
import afterBurnerGame from './games/after_burner_game';
import navBarGame from './games/modal/navbar-game';
import afterburnerGameModal from './games/modal/game-afterburner';
import alertDialogZeroing from './games/modal/alert-dialog-zeroing';
import resultModal from './games/modal/resul-modal';
import lookUpStudent from './user/look_up_student_profile';
import studentResults from './user/student-results';
import schools from './super-admin/my-schools';
import superAdminSchoolInfoPage from './super-admin/school-info-page';
import newOrUpdateSchoolAndAdmin from './super-admin/new-school-and-admin';
import newSchoolAndAdmin from './super-admin/new-school-and-admin';
import teacherProfilePage from './teacher/main-page';
import schoolAdminPage from './user/school-adminpage';
import createTeacherPage from './school-admin/create-teacher-page';
import ratings from './reitings/student-ratings';
import updateTeacher from './school-admin/update-teacher';
import createStudentPage from './school-admin/create-student-page';
import updateStudent from './school-admin/update-student';
import chartResult from './teacher/chart-result';
import operationGameModal from './games/modal/setting-operation-modal';
import multiplier from './games/multiplier';
import generatorGame from './games/generator-game';
import generatorGameModal from './games/modal/generator-game-modal';
import studentProfilePage from './student-profile-page/student-profile-page';
import searchStudents from './super-admin/search-student';
import changeChildPassword from './user/change-child-password';
import createGroup from './school-admin/create-update-group/create-group';
import editGroup from './school-admin/create-update-group/edit-group';
import searchSchools from './super-admin/search-schools';
import makePackageProposal from './school-admin/make-package-proposal';
import superAdminPackageProposals from './super-admin/package-proposals';
import updateSchoolAdmin from './school-admin/update-school-admin';
import teacherPersonalDate from './teacher/teacher-personal-date';
import studentResultArchives from './school-admin/student-result-archives';
import linkMobileApp from './link-mobile-app/link-mobile-app';
import abacus from './games/abacus';
import languageLocal from './language/language';


export default combineReducers({
  notifications: notifyReducer,
  login,
  profile,
  changePassword,
  changeChildPassword,
  makePackageProposal,
  superAdminPackageProposals,
  searchSchools,
  schools,
  superAdminSchoolInfoPage,
  searchStudents,
  createGroup,
  editGroup,
  newOrUpdateSchoolAndAdmin,
  teacherStudents,
  lookUpStudent,
  studentResults,
  gameList,
  gameCountColumns,
  gameCountColumnsModal,
  afterBurnerGame,
  afterburnerGameModal,
  navBarGame,
  alertDialogZeroing,
  resultModal,
  createTeacherPage,
  schoolAdminPage,
  teacherProfilePage,
  createStudentPage,
  updateStudent,
  updateTeacher,
  newSchoolAndAdmin,
  ratings,
  chartResult,
  multiplier,
  operationGameModal,
  generatorGame,
  generatorGameModal,
  studentProfilePage,
  updateSchoolAdmin,
  teacherPersonalDate,
  studentResultArchives,
  linkMobileApp,
  abacus,
  languageLocal,
});
