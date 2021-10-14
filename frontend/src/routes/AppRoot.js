import React from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {history} from '../index';
import LoginPage from '../containers/login/LoginPageContainer';
import MainGamePage from '../containers/games/MainGamePageContainer';
import {PrivateRoute} from './PrivateRouter';
import CountColumnsPage from '../containers/games/count_columns/CountColumnsPage';
import AfterburnerGame from '../containers/games/afterburner/AfterburnerGame';
import SchoolAdminPage from '../containers/profile/SchoolAdminPageContainer';
import TeacherAdmin from '../containers/teacher/MainContainer';
import CreateNewOrUpdateSchool from '../components/profile/superAdmin/CreateNewOrUpdateSchool';
import CreateTeacher from '../containers/SchoolAdmin/CreateTeacherContainer';
import ChangePasswordPageContainer from '../containers/profile/ChangePasswordPageContainer';
import UpdateTeacher from '../containers/SchoolAdmin/UpdateTeacherContainer';
import CreateStudent from '../containers/SchoolAdmin/CreateStudentContainer';
import UpdateStudent from '../containers/SchoolAdmin/UpdateStudentContainer';
import NonActiveUserPageContainer from '../containers/login/NonActiveUserPageContainer';
import Multiplier from '../containers/games/multiplier/MultiplierContainer';
import GeneratorGamePage from '../containers/games/generator-game/GeneratorGamePageContainer';
import SchoolInfoPageContainer from '../containers/profile/SchoolInfoPageContainer';
import StudentProfilePage from '../containers/profile/student/StudentProfilePageContainer';
import SearchStudentsPageContainer from '../containers/profile/superAdmin/SearchStudentsPageContainer';
import SchoolSearchStudentsContainer from '../containers/SchoolAdmin/SchoolSearchStudentsContainer';
import MainRatings from '../containers/games/rating/MainRatingsContainer';
import ChangeChildPasswordContainer from '../containers/profile/ChangeChildPasswordContainer';
import Layout from '../containers/LayoutContainer';
import CreateGroupPageContainer from '../containers/SchoolAdmin/CreateGroupPageContainer';
import EditGroupPageContainer from '../containers/SchoolAdmin/EditGroupPageContainer';
import SuperAdminMainPageContainer from '../containers/profile/superAdmin/MainPageContainer';
import MakePackageProposal from '../containers/SchoolAdmin/MakePackageProposal';
import HomePage from '../containers/HomePage/HomePageContainer';
import {USER_TOKEN_KEY} from '../store/storage_kets';
import PackageProposalsContainer from '../containers/profile/superAdmin/PackageProposalsContainer';
import UpdateSchoolAdmin from '../containers/SchoolAdmin/UpdateSchoolAdmin';
import StudentResultArchivesContainer from '../containers/profile/student/StudentResultArchivesContainer';
import TeachersStudentProfilePageContainer from '../containers/profile/student/TeachersStudentProfilePageContainer';
import AbacusPage from '../containers/games/abacus/AbacusPageContainer';
import {IntlProvider, FormattedMessage} from 'react-intl';
import moment from 'moment';

export const intl = (key) => {
  if (!key) return '';
  return <FormattedMessage id={key} defaultMessage={key}/>;
};

function AppRouter(props) {
  moment.locale(props.languageLocal.lang);
  return (
    <IntlProvider
      locale={props.languageLocal.lang}
      messages={props.languageLocal.messages[props.languageLocal.lang]}
    >
      <Router history={history}>
        <main>
          <Switch>
            <Route exact path="/" component={(props) => {
              const auth_token = localStorage.getItem(USER_TOKEN_KEY);
              if (!auth_token) {
                window.location.href = process.env.REACT_APP_ATLAS_URL;
              }
              return <HomePage {...props}/>;
            }}/>
            <PrivateRoute path={'/teacher_profile/students/:studentId'}
              component={TeachersStudentProfilePageContainer}/>
            <PrivateRoute path="/teacher_profile/:teacherId" component={TeacherAdmin}/>
            <PrivateRoute path="/teacher_profile/" component={TeacherAdmin}/>
            <PrivateRoute path="/groups/:groupId/edit" component={EditGroupPageContainer}/>
            <PrivateRoute path={'/my_schools/create'} component={CreateNewOrUpdateSchool}/>
            <PrivateRoute path="/my_schools/package-proposals" component={PackageProposalsContainer}/>
            <PrivateRoute path={'/my_schools/:schoolId/update'} component={CreateNewOrUpdateSchool}/>
            <PrivateRoute path={'/my_schools/:schoolId'} component={SchoolInfoPageContainer}/>
            <PrivateRoute path={'/my_schools'} component={SuperAdminMainPageContainer}/>
            <PrivateRoute path="/super-admin/search-student" component={SearchStudentsPageContainer}/>
            <PrivateRoute path={'/create_teacher'} component={CreateTeacher}/>
            <PrivateRoute path={'/update_teacher'} component={UpdateTeacher}/>
            <PrivateRoute path={'/update_school_admin'} component={UpdateSchoolAdmin}/>
            <PrivateRoute path={'/create_students'} component={CreateStudent}/>
            <PrivateRoute path={'/update_student'} component={UpdateStudent}/>
            <PrivateRoute path={'/change_password'} component={ChangePasswordPageContainer}/>
            <PrivateRoute path="/games" component={MainGamePage}/>
            <PrivateRoute path="/game/rating" component={MainRatings}/>
            <PrivateRoute path="/game-count-columns" component={CountColumnsPage}/>
            <PrivateRoute path="/game-afterburner" component={AfterburnerGame}/>
            <PrivateRoute path="/game-multiplier" component={Multiplier}/>
            <PrivateRoute path="/generator-game" component={GeneratorGamePage}/>
            <PrivateRoute path="/abacus" component={AbacusPage}/>
            <PrivateRoute path="/teachers/:teacherId/create-group" component={CreateGroupPageContainer}/>
            <PrivateRoute path="/school-admin-page/make-package-proposal" component={MakePackageProposal}/>
            <PrivateRoute path="/school-admin-page/search-students"
              component={SchoolSearchStudentsContainer}/>
            <PrivateRoute path="/school-admin-page" component={SchoolAdminPage}/>
            <PrivateRoute path="/student-profile" component={StudentProfilePage}/>
            <PrivateRoute path="/result-archives/:studentId" component={StudentResultArchivesContainer}/>
            <PrivateRoute path="/change-child-password/:childUserId"
              component={ChangeChildPasswordContainer}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/non-activated-user" component={NonActiveUserPageContainer}/>
            <Route component={() => <Redirect to="/games"/>}/>
          </Switch>
        </main>
        <Layout/>
      </Router>
    </IntlProvider>
  );
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(
    mapStateToProps,
    {},
)(AppRouter);
