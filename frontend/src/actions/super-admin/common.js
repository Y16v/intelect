import axios from 'axios';
import {USER_TOKEN_KEY} from '../../store/storage_kets';
import {history} from '../../index';
import {createNotification} from 'react-redux-notify';
import {
  createSchoolErrorNotification,
  createSchoolSuccessNotification,
  updatePackageSuccessNotificationConfig,
} from '../school/notifications';

export const GET_SCHOOLS_SUCCESS = 'GET_SCHOOLS_SUCCESS';
export const GET_SCHOOLS_FAIL = 'GET_SCHOOLS_FAIL';
export const RETRIEVE_SCHOOL_SUCCESS = 'GET_SCHOOL_SUCCESS';
export const RETRIEVE_SCHOOL_FAIL = 'GET_SCHOOL_FAIL';
export const CREATE_SCHOOL_ADMIN_SUCCESS = 'CREATE_SCHOOL_ADMIN_SUCCESS';
export const CREATE_SCHOOL_ADMIN_FAIL = 'CREATE_SCHOOL_ADMIN_FAIL';
export const UPDATE_SCHOOL_ADMIN_SUCCESS = 'UPDATE_SCHOOL_ADMIN_SUCCESS';
export const UPDATE_SCHOOL_ADMIN_FAIL = 'UPDATE_SCHOOL_ADMIN_FAIL';
export const UPDATE_SCHOOL_SUCCESS = 'UPDATE_SCHOOL_SUCCESS';
export const UPDATE_SCHOOL_FAIL = 'UPDATE_SCHOOL_FAIL';
export const CREATE_SCHOOL_SUCCESS = 'CREATE_SCHOOL_SUCCESS';
export const CREATE_SCHOOL_FAIL = 'CREATE_SCHOOL_FAIL';
export const GET_SCHOOL_ADMIN_SUCCESS = 'GET_SCHOOL_ADMIN_SUCCESS';
export const GET_SCHOOL_ADMIN_FAIL = 'GET_SCHOOL_ADMIN_FAIL';
export const FINISH_UPDATE_OR_CREATE_SCHOOL = 'FINISH_UPDATE_OR_CREATE_SCHOOL';
export const GET_SCHOOL_TEACHERS_SUCCESS = 'GET_SCHOOL_TEACHERS_SUCCESS';
export const GET_SCHOOL_TEACHERS_FAIL = 'GET_SCHOOL_TEACHERS_FAIL';
export const GET_SCHOOL_STUDENTS_SUCCESS = 'GET_SCHOOL_STUDENTS_SUCCESS';
export const GET_SCHOOL_STUDENTS_FAIL = 'GET_SCHOOL_STUDENTS_FAIL';
export const SEARCH_TEXT_FILTER = 'SEARCH_TEXT_FILTER';
export const UPDATE_SCHOOL_PACKAGE_SUCCESS = 'SUPER_ADMIN_SCHOOL_INFO_PAGE/UPDATE_SCHOOL_PACKAGE_SUCCESS';
export const UPDATE_SCHOOL_PACKAGE_FAIL = 'SUPER_ADMIN_SCHOOL_INFO_PAGE/UPDATE_SCHOOL_PACKAGE_FAIL';
export const UPDATE_SCHOOL_PACKAGE_TYPE_SUCCESS = 'SUPER_ADMIN_SCHOOL_INFO_PAGE/UPDATE_SCHOOL_PACKAGE_TYPE_SUCCESS';
export const UPDATE_SCHOOL_PACKAGE_TYPE_FAIL = 'SUPER_ADMIN_SCHOOL_INFO_PAGE/UPDATE_SCHOOL_PACKAGE_TYPE_FAIL';
export const GET_FOR_SCHOOLS_PACKAGE_TYPES_SUCCESS = 'SUPER_ADMIN_SCHOOL_INFO_PAGE/GET_FOR_SCHOOLS_PACKAGE_TYPES_SUCCESS';
export const GET_FOR_SCHOOLS_PACKAGE_TYPES_FAIL = 'SUPER_ADMIN_SCHOOL_INFO_PAGE/GET_FOR_SCHOOLS_PACKAGE_TYPES_FAIL';
export const OPEN_UPDATE_PACKAGE_CONFIRM_DIALOG = 'SUPER_ADMIN_SCHOOL_INFO_PAGE/OPEN_UPDATE_PACKAGE_CONFIRM_DIALOG';
export const CLOSE_UPDATE_PACKAGE_CONFIRM_DIALOG = 'SUPER_ADMIN_SCHOOL_INFO_PAGE/CLOSE_UPDATE_PACKAGE_CONFIRM_DIALOG';
export const OPEN_UPDATE_PACKAGE_TYPE_CONFIRM_DIALOG = 'SUPER_ADMIN_SCHOOL_INFO_PAGE/OPEN_UPDATE_PACKAGE_TYPE_CONFIRM_DIALOG';
export const CLOSE_UPDATE_PACKAGE_TYPE_CONFIRM_DIALOG = 'SUPER_ADMIN_SCHOOL_INFO_PAGE/CLOSE_UPDATE_PACKAGE_TYPE_CONFIRM_DIALOG';
export const SET_UPDATE_PACKAGE_CONFIRM_PASSWORD = 'SUPER_ADMIN_SCHOOL_INFO_PAGE/SET_UPDATE_PACKAGE_CONFIRM_PASSWORD';
export const SET_UPDATE_PACKAGE_TYPE_CONFIRM_PASSWORD = 'SUPER_ADMIN_SCHOOL_INFO_PAGE/SUPER_ADMIN_SCHOOL_INFO_PAGE';
export const SET_PACKAGE_TYPE_FOR_UPGRADE_TARIFF = 'SUPER_ADMIN_SCHOOL_INFO_PAGE/SET_PACKAGE_TYPE_FOR_UPGRADE_TARIFF';
export const SHOW_SCHOOL_ACTIONS_MENU = 'SUPER_ADMIN_SCHOOL_INFO_PAGE/SHOW_SCHOOL_ACTIONS_MENU';
export const CLOSE_SCHOOL_ACTIONS_MENU = 'SUPER_ADMIN_SCHOOL_INFO_PAGE/CLOSE_SCHOOL_ACTIONS_MENU';


export const setSchoolValue = (key, value) => (dispatch, getState) => {
  const state = getState();
  const school = state.schools.retrieveSchool;
  school[key] = value;
  dispatch({
    type: RETRIEVE_SCHOOL_SUCCESS,
    school: school,
  });
};

export const setSchoolAdminValue = (key, value) => (dispatch, getState) => {
  const state = getState();
  const schoolAdmin = state.schools.schoolAdminToShow;
  schoolAdmin[key] = value;
  dispatch({
    type: GET_SCHOOL_ADMIN_SUCCESS,
    schoolAdmin: schoolAdmin,
  });
};

export const handleFilter = (value) =>{
  return ({type: SEARCH_TEXT_FILTER, value});
};


export const getSchoolWithAdmin = (schoolId) => (dispatch) => {
  const token = localStorage.getItem(USER_TOKEN_KEY);
  const url = `/api/schools/${schoolId}`;

  axios.get(url, {headers: {Authorization: token}})
      .then((response) => {
        dispatch({
          type: RETRIEVE_SCHOOL_SUCCESS,
          school: response.data,
        });
        const url = `/api/school_admins/${response.data.owner_id}`;

        axios.get(url, {headers: {Authorization: token}})
            .then((response) => {
              dispatch({
                type: GET_SCHOOL_ADMIN_SUCCESS,
                schoolAdmin: response.data,
              });
            })
            .catch((error) => {
              dispatch({
                type: GET_SCHOOL_ADMIN_FAIL,
                error: error.response.data.error,
              });
            });
      })
      .catch((error) => {
        dispatch({
          type: RETRIEVE_SCHOOL_FAIL,
          error: error.response.data.error,
        });
      });
};


export const retrieveSchool = (schoolId) => (dispatch) => {
  const url = `/api/schools/${schoolId}`;
  const token = localStorage.getItem(USER_TOKEN_KEY);

  axios.get(url, {headers: {Authorization: token}})
      .then((response) => {
        dispatch({
          type: RETRIEVE_SCHOOL_SUCCESS,
          school: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: RETRIEVE_SCHOOL_FAIL,
          error: error.response.data.error,
        });
      });
};


export const getSchoolTeachers = (schoolId) => (dispatch) => {
  const baseUrl = `/api/schools/${schoolId}/teachers`;
  const token = localStorage.getItem(USER_TOKEN_KEY);

  axios.get(baseUrl, {headers: {Authorization: token}})
      .then((response) => {
        dispatch({
          type: GET_SCHOOL_TEACHERS_SUCCESS,
          teachers: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_SCHOOL_TEACHERS_FAIL,
          error: error.response.data.error,
        });
      });
};


export const getSchoolStudents = (schoolId) => (dispatch) => {
  const baseUrl = `/api/schools/${schoolId}/students`;
  const token = localStorage.getItem(USER_TOKEN_KEY);

  axios.get(baseUrl, {headers: {Authorization: token}})
      .then((response) => {
        dispatch({
          type: GET_SCHOOL_STUDENTS_SUCCESS,
          students: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_SCHOOL_STUDENTS_FAIL,
          error,
        });
      });
};


export const getPackageTypesForSchools = () => (dispatch) => {
  const url = '/api/package_types';

  axios.get(url)
      .then((response) => {
        dispatch({
          type: GET_FOR_SCHOOLS_PACKAGE_TYPES_SUCCESS,
          packageTypes: response.data,
        });
      })
      .catch(({response}) => {
        dispatch({
          type: GET_FOR_SCHOOLS_PACKAGE_TYPES_FAIL,
          error: response.data && response.data.error,
        });
      });
};


export const openUpdatePackageTypeConfirmDialog = () => ({
  type: OPEN_UPDATE_PACKAGE_TYPE_CONFIRM_DIALOG,
});


export const setUpdatePackageConfirmPassword = (value) => ({
  type: SET_UPDATE_PACKAGE_CONFIRM_PASSWORD,
  password: value,
});

export const setUpdatePackageTypeConfirmPassword = (value) => ({
  type: SET_UPDATE_PACKAGE_TYPE_CONFIRM_PASSWORD,
  password: value,
});


export const closeUpdatePackageTypeConfirmDialog = () => (dispatch) => {
  dispatch({
    type: CLOSE_UPDATE_PACKAGE_TYPE_CONFIRM_DIALOG,
  });
  dispatch({
    type: SET_UPDATE_PACKAGE_TYPE_CONFIRM_PASSWORD,
    password: '',
  });
  dispatch({
    type: UPDATE_SCHOOL_PACKAGE_TYPE_FAIL,
    error: '',
  });
};

export const updatePackageType = () => (dispatch, getState) => {
  const {superAdminSchoolInfoPage} = getState();
  const confirmPassword = superAdminSchoolInfoPage && superAdminSchoolInfoPage.updatePackageTypeConfirmPassword;
  const schoolId = superAdminSchoolInfoPage.school.id;
  const packageTypeId = superAdminSchoolInfoPage.selectedPackageTypeForUpgrade.id;
  const url = `/api/schools/${schoolId}/update_package_type`;
  const token = localStorage.getItem(USER_TOKEN_KEY);

  axios.put(url,
      {confirm_password: confirmPassword, package_type_id: packageTypeId},
      {headers: {Authorization: token}},
  )
      .then((response) => {
        dispatch({
          type: UPDATE_SCHOOL_PACKAGE_TYPE_SUCCESS,
          updatedPackage: response.package,
        });
        dispatch(createNotification(updatePackageSuccessNotificationConfig));
        dispatch({
          type: CLOSE_UPDATE_PACKAGE_TYPE_CONFIRM_DIALOG,
        });
        dispatch({
          type: SET_UPDATE_PACKAGE_TYPE_CONFIRM_PASSWORD,
          password: '',
        });
        dispatch({
          type: UPDATE_SCHOOL_PACKAGE_TYPE_FAIL,
          error: '',
        });
      })
      .catch(({response}) => {
        const errorCode = response.data && response.data.error;
        const errorMessage = errorCode === 'user.aut.passwordNotMatch' ? 'Введенный пароль не правильный!' : 'Что-то пошло не так!';

        dispatch({
          type: UPDATE_SCHOOL_PACKAGE_TYPE_FAIL,
          error: errorMessage,
        });
      });
};


export const openUpdatePackageConfirmDialog = () => ({
  type: OPEN_UPDATE_PACKAGE_CONFIRM_DIALOG,
});

export const closeUpdatePackageConfirmDialog = () => (dispatch) => {
  dispatch({
    type: CLOSE_UPDATE_PACKAGE_CONFIRM_DIALOG,
  });
  dispatch({
    type: SET_UPDATE_PACKAGE_CONFIRM_PASSWORD,
    password: '',
  });
  dispatch({
    type: UPDATE_SCHOOL_PACKAGE_FAIL,
    error: '',
  });
};


export const setPackageTypeForUpgradeTariff = (packageType) => ({
  type: SET_PACKAGE_TYPE_FOR_UPGRADE_TARIFF,
  packageType: packageType,
});

export const updatePackage = () => (dispatch, getState) => {
  const {superAdminSchoolInfoPage} = getState();
  const confirmPassword = superAdminSchoolInfoPage && superAdminSchoolInfoPage.updatePackageConfirmPassword;
  const schoolId = superAdminSchoolInfoPage.school.id;
  const url = `/api/schools/${schoolId}/update_package`;
  const token = localStorage.getItem(USER_TOKEN_KEY);

  axios.put(url,
      {confirm_password: confirmPassword},
      {headers: {Authorization: token}},
  )
      .then((response) => {
        dispatch({
          type: UPDATE_SCHOOL_PACKAGE_SUCCESS,
          updatedPackage: response.package,
        });
        dispatch({
          type: CLOSE_UPDATE_PACKAGE_CONFIRM_DIALOG,
        });
        dispatch({
          type: SET_UPDATE_PACKAGE_CONFIRM_PASSWORD,
          password: '',
        });
        dispatch(createNotification(updatePackageSuccessNotificationConfig));
      })
      .catch(({response}) => {
        const errorCode = response.data && response.data.error;
        const errorMessage = errorCode === 'user.aut.passwordNotMatch' ? 'Введенный пароль не правильный!' : 'Что-то пошло не так!';
        dispatch({
          type: UPDATE_SCHOOL_PACKAGE_FAIL,
          error: errorMessage,
        });
      });
};


export const finishUpdateOrCreate = () => (dispatch) => {
  dispatch({
    type: FINISH_UPDATE_OR_CREATE_SCHOOL,
  });
  history.push('/my_schools');
};

export const redirectToEditSchool = (schoolId) => (dispatch) => {
  history.push(`/my_schools/${schoolId}`);
};


export const createNewOrUpdateSchoolWithAdmin = (school, user, update) => (dispatch) => {
  if (!update) {
    createNewSchoolWithAdmin(dispatch, school, user);
  } else {
    updateSchoolWithSchoolAdmin(dispatch, school, user);
  }
};

const createNewSchoolWithAdmin = (dispatch, school, user) => {
  const url = '/api/school_admins';
  const token = localStorage.getItem(USER_TOKEN_KEY);

  axios.post(url, user, {headers: {Authorization: token}})
      .then((response) => {
        dispatch({
          type: CREATE_SCHOOL_ADMIN_SUCCESS,
          newSchoolAdmin: response.data,
        });

        const newUrl = '/api/schools';
        const data = {
          owner_id: response.data.id,
          name: school.name,
          is_active: school.is_active === undefined ? true : school.is_active,
        };

        axios.post(newUrl, data, {headers: {Authorization: token}})
            .then((response) => {
              dispatch({
                type: CREATE_SCHOOL_SUCCESS,
                newSchool: response.data,
              });
              dispatch(createNotification(createSchoolSuccessNotification));
              dispatch({
                type: FINISH_UPDATE_OR_CREATE_SCHOOL,
              });
              history.push('/my_schools');
            })
            .catch((error) => {
              let errorMessage;
              switch (error.response.data.error) {
                case 'school.name.already_exist':
                  errorMessage = 'Уже существует школа с таким названием.';
                  break;
                case 'school.owner.doesNotMath':
                  errorMessage = 'Не нашли админа школы.';
                  break;
                        // no default
              }
              dispatch(createNotification(createSchoolErrorNotification));
              dispatch({
                type: CREATE_SCHOOL_FAIL,
                error: errorMessage,
              });
            });
      })
      .catch((error) => {
        let errorMessage;
        switch (error.response.data.error) {
          case 'user.phone.alreadyTaken':
            errorMessage = 'Пользователь с таким номером телефона уже существует.';
            break;
          case 'user.email.alreadyTaken':
            errorMessage = 'Пользователь с таким адресом электронной почты уже существует.';
            break;
          case 'user.username.alreadyTaken':
            errorMessage = 'Пользователь с таким именем пользователя уже существует.';
            break;
                // no default
        }
        dispatch({
          type: CREATE_SCHOOL_ADMIN_FAIL,
          error: errorMessage,
        });
      });
};


const updateSchoolWithSchoolAdmin = (dispatch, school, user) => {
  const url = `/api/school_admins/${user.id}`;
  const token = localStorage.getItem(USER_TOKEN_KEY);

  axios.put(url, user, {headers: {Authorization: token}})
      .then((response) => {
        dispatch({
          type: UPDATE_SCHOOL_ADMIN_SUCCESS,
          updatedSchoolAdmin: response.data,
        });

        const newUrl = `/api/schools/${user.school_id}`;
        const data = {
          owner_id: response.data.id,
          name: school.name,
          is_active: school.is_active,
        };

        axios.put(newUrl, data, {headers: {Authorization: token}})
            .then((response) => {
              dispatch({
                type: UPDATE_SCHOOL_SUCCESS,
                updatedSchool: response.data,
              });
              dispatch({
                type: FINISH_UPDATE_OR_CREATE_SCHOOL,
              });
              history.push('/my_schools');
            })
            .catch((error) => {
              let errorMessage;
              switch (error.response.data.error) {
                case 'school.name.already_exist':
                  errorMessage = 'Уже существует школа с таким названием.';
                  break;
                case 'school.owner.doesNotMath':
                  errorMessage = 'Не нашли админа школы.';
                  break;
                        // no default
              }
              dispatch({
                type: UPDATE_SCHOOL_FAIL,
                error: errorMessage,
              });
            });
      })
      .catch((error) => {
        let errorMessage;
        switch (error.response.data.error) {
          case 'user.phone.alreadyTaken':
            errorMessage = 'Пользователь с таким номером телефона уже существует.';
            break;
          case 'user.email.alreadyTaken':
            errorMessage = 'Пользователь с таким адресом электронной почты уже существует.';
            break;
          case 'user.username.alreadyTaken':
            errorMessage = 'Пользователь с таким именем пользователя уже существует.';
            break;
                // no default
        }
        dispatch({
          type: UPDATE_SCHOOL_ADMIN_FAIL,
          error: errorMessage,
        });
      });
};


export const getSchoolAdmin = (schoolAdminId) => (dispatch) => {
  const url = `/api/school_admins/${schoolAdminId}`;
  const token = localStorage.getItem(USER_TOKEN_KEY);

  axios.get(url, {headers: {Authorization: token}})
      .then((response) => {
        dispatch({
          type: GET_SCHOOL_ADMIN_SUCCESS,
          schoolAdmin: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_SCHOOL_ADMIN_FAIL,
          error: error.response.data.error,
        });
      });
};


export const showSchoolActionsMenu = ({schoolId, adminId, anchorEl}) => ({
  type: SHOW_SCHOOL_ACTIONS_MENU,
  schoolId,
  adminId,
  anchorEl,
});

export const closeSchoolActionsMenu = () => ({
  type: CLOSE_SCHOOL_ACTIONS_MENU,
});
