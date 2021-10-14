export const SUPER_ADMIN_ID = 1;
export const ADMIN_ID = 2;
export const TEACHER_ID = 3;
export const STUDENT_ID = 4;

export const USER_CATEGORY_NAME = {
  [SUPER_ADMIN_ID]: 'superAdminId',
  [ADMIN_ID]: 'adminId',
  [TEACHER_ID]: 'teacherId',
  [STUDENT_ID]: 'studentId',
};


export const USER_CATEGORY_PUSH = {
  [SUPER_ADMIN_ID]: '/my_schools',
  [ADMIN_ID]: '/school-admin-page',
  [TEACHER_ID]: '/teacher_profile',
  [STUDENT_ID]: '/student-profile',
};


export const SUPER_ADMIN = '_super_admin';
export const SCHOOL_ADMIN = '_school_admin';
export const TEACHER = '_teacher';
export const STUDENT = '_student';
