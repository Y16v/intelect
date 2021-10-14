import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import {isMobile} from 'react-device-detect';
import {CircularProgress} from '@material-ui/core';
import {intl} from '../../../routes/AppRoot';


export default function StudentsListTable(props) {
  const {searchStudents, actions} = props;
  const {isLoading} = props.searchStudents;
  return (
    <div>
      <TableContainer style={isMobile ? {overflowX: 'auto', width: '90vw', backgroundColor: 'rgba(255, 255, 255, 0)'} :
                {overflowX: 'auto', backgroundColor: 'rgba(255, 255, 255, 0)'}}>
        {!isLoading ?
                <Table stickyHeader aria-label="sticky table" className="students-table">
                  <TableHead >
                    <TableRow>
                      <TableCell>{intl('game.modal.studentsListTable.aPlace')}</TableCell>
                      <TableCell>{intl('game.modal.studentsListTable.participant')}</TableCell>
                      <TableCell>{intl('game.modal.studentsListTable.school')}</TableCell>
                      <TableCell>{intl('game.modal.studentsListTable.points')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchStudents.searchResult.students.map((student, index) => (
                      <TableRow key={student.id}>
                        <TableCell className="place-number-column">{`${student.order + 1}`}</TableCell>
                        <TableCell>{`${student.last_name} ${student.first_name}`}</TableCell>
                        <TableCell>{student.school_name}</TableCell>
                        <TableCell >{student.rating}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>:
                <div className="student-list-table-spinner">
                  <CircularProgress color="secondary" size={70}/>
                </div>}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[searchStudents.paginationCount]}
        component="div"
        className="table-pagination"
        count={searchStudents.searchResult.total || 0}
        rowsPerPage={searchStudents.paginationCount || 30}
        page={searchStudents.page - 1}
        onChangePage={(event, newValue) => actions.setPage(newValue + 1)}
      />
    </div>
  );
}
