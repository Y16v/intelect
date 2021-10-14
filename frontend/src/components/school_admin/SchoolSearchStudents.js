import React from 'react';
import NavBarContainer from '../../containers/profile/NavBarContainer';
import {CardContent, Container, TextField} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import StudentsTable from '../profile/common/StudentsTable';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import CustomForm from '../common/CustomForm';
import {intl} from '../../routes/AppRoot';


export default function(props) {
  const {actions, profile, page, paginationCount, selectedSchoolId} = props;
  React.useEffect(() => {
    actions.getCurrentUser();
  }, [actions]);

  React.useEffect(() => {
    if (profile.school_id) {
      actions.setSchoolIdAndSetTeacherSelectOptions(profile.school_id);
    }
  }, [actions, profile.school_id]);

  React.useEffect(() => {
    if (selectedSchoolId && selectedSchoolId !== '__all__') {
      actions.searchStudents();
    }
  }, [actions, page, paginationCount, selectedSchoolId]);

  return (
    <div>
      <NavBarContainer/>
      <Container className="main-container">
        <Card>
          <CardContent>
            <div>
              <section className="header">
                <Typography variant="h4" component="h4">{intl('searchStudent')}</Typography>
              </section>
              <section className="search-form">
                <Card variant="outlined">
                  <CardContent>
                    {SearchForm({
                      ...props,
                    })}
                  </CardContent>
                </Card>
              </section>
              <section className="result-table">
                <Typography component="h5" variant="h5" color="primary">{intl('schoolAdmin.schoolSearchStudent.result')}</Typography>
                <StudentsTable
                  {...props}
                  {...props.actions}
                  students={props.searchResult.students}
                  total={props.searchResult.total || 0 }
                  setCount={props.actions.setPaginationCount}
                  userCategoryId={2}
                  excludeSchool={true}
                />
              </section>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};


function SearchForm({
  actions,
  searchValue,
  selectedSchoolId,
  selectedTeacherId,
  selectedGroupId,
  playedAt,
  teacherSelectOptions,
  groupSelectOptions,
}) {
  const submitSearch = () => {
    actions.setPage(1);
    actions.searchStudents();
  };
  return (
    <CustomForm onSubmit={submitSearch}>
      <Grid container spacing={3}>
        <Grid item>
          <FormControl style={{marginTop: '12px'}}>
            <TextField
              fullWidth
              value={searchValue}
              InputLabelProps={{shrink: true}}
              onChange={(event) => actions.setSearchValue(event.target.value)}
            />
            <FormHelperText>{intl('profile.superAdmin.searchStudentPage.filterByName')}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl disabled={selectedSchoolId === '__all__'} style={{minWidth: 200}}>
            <Select
              value={selectedTeacherId}
              onChange={(event) => actions.setTeacherIdAndSetGroupSelectOptions(event.target.value)}
            >
              <MenuItem value="__all__">{intl('all')}</MenuItem>
              {teacherSelectOptions.map((teacher) => (
                <MenuItem value={teacher.id} key={teacher.id}>{teacher.first_name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{intl('filterByTeacher')}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl disabled={selectedTeacherId === '__all__'} style={{minWidth: 200}}>
            <Select
              value={selectedGroupId}
              onChange={(event) => actions.setGroupId(event.target.value)}
            >
              <MenuItem value="__all__">{intl('all')}</MenuItem>
              <MenuItem value="__empty__">{intl('withoutGroup')}</MenuItem>
              {groupSelectOptions.map((group) => (
                <MenuItem value={group.id} key={group.id}>{group.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{intl('filterByGroup')}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              maxDate={new Date()}
              variant="inline"
              autoOk
              margin="normal"
              format="YYYY-MM-DD"
              value={playedAt}
              onChange={actions.setPlayedAt}
              helperText={intl('filterByDateGame')}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item>
          <FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >{intl('search')}</Button>
          </FormControl>
        </Grid>
      </Grid>
    </CustomForm>
  );
}

