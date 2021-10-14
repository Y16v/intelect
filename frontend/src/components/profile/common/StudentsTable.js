import React from 'react';
import {CircularProgress, Table, TableBody, TableCell, TableContainer, TableRow} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import {ADMIN_ID} from '../../../reducers/user/fixture';
import StudentActionsMenu from './StudentActionsMenu';
import {makeStyles} from '@material-ui/core/styles';
import {intl} from '../../../routes/AppRoot';


const useStyles = makeStyles((theme) => ({
  circularContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function({
  students,
  total,
  page,
  paginationCount,
  excludeSchool,
  excludeTeacher,
  actionMenuAttrs,
  userCategoryId,
  redirectToEditStudent,
  updateStudentAccess,
  showStudentActionsMenu,
  closeStudentActionsMenu,
  setPage,
  setCount,
  isLoading,
  deleteStudentAccess,
}) {
  const classes = useStyles();
  return (
    <div>
      <TableContainer>
        {StudentActionsMenu(
            closeStudentActionsMenu,
            {
              ...actionMenuAttrs,
              redirectToEditStudent,
              updateStudentAccess,
              deleteStudentAccess,
            },
        )}
        {!isLoading ?
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{intl('profile.common.studentTable.lFPName')}</TableCell>
                      {!excludeSchool && (<TableCell>{intl('profile.common.studentTable.school')}</TableCell>)}
                      {!excludeTeacher && (<TableCell>{intl('profile.common.studentTable.teacher')}</TableCell>)}
                      <TableCell>{intl('profile.common.studentTable.activeUntil')}</TableCell>
                      <TableCell>{intl('profile.common.studentTable.points')}</TableCell>
                      <TableCell>{intl('profile.common.studentTable.rankingPlace')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow
                        key={student.id}
                        hover
                        onClick={(event) => showStudentActionsMenu({
                          student: student,
                          needToUpdateAccess: student.needToUpdateAccess,
                          canUpdateAccess: userCategoryId === ADMIN_ID,
                          anchorEl: event.currentTarget,
                        })}
                      >
                        <TableCell>{`${student.last_name} ${student.first_name}`}</TableCell>
                        {!excludeSchool && (<TableCell>{student.school_name}</TableCell>)}
                        {!excludeTeacher && (<TableCell>{`${student.teacher.last_name} ${student.teacher.first_name}`}</TableCell>)}
                        <TableCell>{student.active_until}</TableCell>
                        <TableCell>{student.rating || 0}</TableCell>
                        <TableCell>{student.order + 1}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>:
                <div className={classes.circularContainer}>
                  <CircularProgress color="secondary" size={70}/>
                </div>}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={paginationCount}
        page={page - 1}
        onChangePage={(event, newValue) => setPage(newValue + 1)}
        onChangeRowsPerPage={
          ({target}) => setCount(parseInt(target.value))
        }
      />
    </div>
  );
}
