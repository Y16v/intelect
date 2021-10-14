import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {CardContent, Container, Menu, Table, TableBody, TableCell, TextField} from '@material-ui/core';
import TeacherPersonalDataContainer from '../../../containers/profile/teacher/TeacherPersonalDataContainer';
import NavBarContainer from '../../../containers/profile/NavBarContainer';
import StudentProfile from '../../../containers/profile/student/StudentProfileContainer';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {SUPER_ADMIN_ID, TEACHER_ID} from '../../../reducers/user/fixture';
import Button from '@material-ui/core/Button';
import {history} from '../../../index';
import CustomLink from '../../common/CustomLink';
import StudentsTable from '../common/StudentsTable';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import NotFoundOrPermissionDenied from '../../common/NotFoundOrPermissionDenied';
import {intl} from '../../../routes/AppRoot';


export default function MainPage({
  actions,
  match,
  teacher,
  loggedUser,
  searchStudent,
  school,
  studentActionMenuAttrs,
  groupActionMenuAttrs,
  getTeacherError,
  ...props
}) {
  const {teacherId} = match.params;

  if (!teacherId) {
    teacher = loggedUser;
  }

  React.useEffect(() => {
    actions.getCurrentUser();
  }, [actions]);

  React.useEffect(() => {
    if (teacherId) {
      actions.getTeacher(teacherId);
    }
  }, [actions, actions.getTeacher, teacherId]);

  React.useEffect(() => {
    if (teacher.school_id) {
      actions.setSchoolId(teacher.school_id);
    }
    if (teacher.school_id && teacher.id) {
      actions.setTeacherIdAndSetGroupSelectOptions(teacher.id);
    }
  }, [actions, teacher.school_id, teacher.id, groupActionMenuAttrs.deleteGroupSuccess]);

  React.useEffect(() => {
    if (searchStudent.selectedSchoolId !== '__all__' && searchStudent.selectedTeacherId !== '__all__') {
      actions.searchStudents();
    }
  }, [
    actions,
    searchStudent.selectedSchoolId,
    searchStudent.selectedTeacherId,
    searchStudent.selectedGroupId,
    searchStudent.searchValue,
    searchStudent.page,
    searchStudent.paginationCount,
  ]);

  return (
    <div style={{backgroundColor: '#ecf0f1', minHeight: '100vh'}}>
      <Box paddingTop={2}>
        <NavBarContainer/>
        {(loggedUser.category_id === SUPER_ADMIN_ID || getTeacherError) ? (<NotFoundOrPermissionDenied/>) : (
                    <MainContent
                      {...{
                        actions,
                        match,
                        teacher,
                        loggedUser,
                        searchStudent,
                        school,
                        studentActionMenuAttrs,
                        groupActionMenuAttrs,
                        getTeacherError,
                        ...props,
                      }}
                    />
                )}
      </Box>
    </div>
  );
}


function MainContent({
  actions,
  match,
  teacher,
  loggedUser,
  searchStudent,
  school,
  studentActionMenuAttrs,
  groupActionMenuAttrs,
  getTeacherError,
  ...props}) {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Card>
            <CardContent>
              <section className="base-section">
                <Grid container spacing={3} alignItems="center">
                  <Grid item>
                    <Typography variant="h5">{intl('profile.teacher.main.students')}</Typography>
                  </Grid>
                  {loggedUser.category_id !== TEACHER_ID && <Grid item>
                    <Button
                      disabled={school.package <= 0}
                      variant="contained"
                      color="primary"
                      onClick={() => history.push('/create_students')}>
                      {intl('profile.teacher.main.createStudent')}
                    </Button>
                  </Grid>}
                </Grid>
              </section>
              <section className="base-section">
                <Card variant="outlined">
                  <CardContent>
                    <Grid item container alignItems="flex-end" spacing={3}>
                      <Grid item>
                        <FormControl>
                          <TextField
                            fullWidth
                            value={searchStudent.searchValue}
                            InputLabelProps={{shrink: true}}
                            onChange={(event) => actions.setSearchValue(event.target.value)}
                          />
                          <FormHelperText>{intl('profile.teacher.main.filterByName')}</FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <FormControl>
                          <Select
                            value={searchStudent.selectedGroupId}
                            onChange={(event) => actions.setGroupId(event.target.value)}
                          >
                            <MenuItem value="__all__">{intl('profile.teacher.main.all')}</MenuItem>
                            <MenuItem value="__empty__">{intl('profile.teacher.main.withoutGroup')}</MenuItem>
                            {searchStudent.groupSelectOptions.map((group) => (
                              <MenuItem value={group.id} key={group.id}>{group.name}</MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>{intl('profile.teacher.main.filterByGroups')}</FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </section>
              <section className="base-section">
                <StudentsTable
                  {...props}
                  {...searchStudent}
                  {...actions}
                  actionMenuAttrs={studentActionMenuAttrs}
                  students={searchStudent.searchResult.students}
                  total={searchStudent.searchResult.total || 0 }
                  setCount={actions.setPaginationCount}
                  userCategoryId={loggedUser.category_id}
                  excludeSchool={true}
                  excludeTeacher={true}
                />
              </section>
            </CardContent>
          </Card>
          <Card className="mt-3">
            <CardContent>
              <section className="base-section">
                <Grid container spacing={3}>
                  <Grid item>
                    <Typography variant="h5">{intl('profile.teacher.main.group')}</Typography>
                  </Grid>
                  <Grid item>
                    <CustomLink
                      to={`/teachers/${teacher.id}/create-group`}
                      tag={Button}
                      variant="contained"
                      color="primary"
                    >{intl('profile.teacher.main.createGroup')}</CustomLink>
                  </Grid>
                </Grid>
              </section>
              <section className="base-section">
                <GroupsTable
                  {...actions}
                  groups={searchStudent.groupSelectOptions}
                  groupActionMenuAttrs={groupActionMenuAttrs}
                />
              </section>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <TeacherPersonalDataContainer/>
          {loggedUser.category_id !== TEACHER_ID && <StudentProfile teacher={teacher}/>}
        </Grid>
      </Grid>
    </Container>
  );
}

function GroupsTable({groups, groupActionMenuAttrs, showGroupActionMenu, closeGroupActionMenu, deleteGroup}) {
  return (
    <Table>
      <GroupActionsMenu {...groupActionMenuAttrs} onClose={closeGroupActionMenu} deleteGroup={deleteGroup}/>
      <TableHead>
        <TableRow>
          <TableCell>{intl('profile.teacher.main.name')}</TableCell>
          <TableCell>{intl('profile.teacher.main.numberOfStudent')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {groups.map((group) => (
          <TableRow
            hover key={group.id}
            onClick={(target) =>
              showGroupActionMenu({groupId: group.id, groupName: group.name, anchorEl: target.currentTarget})
            }
          >
            <TableCell >{group.name}</TableCell>
            <TableCell>{group.students.length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


function GroupActionsMenu({onClose, anchorEl, groupId, deleteGroup}) {
  return (
    <Menu
      keepMounted
      open={!!groupId}
      anchorEl={anchorEl}
      onClose={onClose}
    >
      <MenuItem>
        <CustomLink
          to={`/groups/${groupId}/edit`}
          onClick={onClose}
          tag={Box}
          width="100%"
        >
          {intl('profile.teacher.main.update')}
        </CustomLink>
      </MenuItem>
      <MenuItem
        onClick={deleteGroup}
      >
        {intl('profile.teacher.main.delete')}
      </MenuItem>
    </Menu>
  );
}
