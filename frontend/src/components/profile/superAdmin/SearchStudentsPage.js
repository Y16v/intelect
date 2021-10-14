import React from 'react';
import NavBarContainer from '../../../containers/profile/NavBarContainer';
import {CardContent, Container, TextField} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import StudentsTable from '../common/StudentsTable';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import CustomForm from '../../common/CustomForm';
import {intl} from '../../../routes/AppRoot';

export default function(props) {
  const {actions, page} = props;

  React.useEffect(() => {
    actions.searchStudents();
    actions.setSchoolSelectOptions();
  }, [actions, page, props.paginationCount]);

  return (
    <div>
      <NavBarContainer/>
      <Container className="main-container">
        <Card>
          <CardContent>
            <div>
              <section className="header">
                <Typography variant="h4" component="h4">{intl('profile.superAdmin.searchStudentPage.filterStudent')}</Typography>
              </section>
              <section className="search-form">
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center">
                  <Grid item xs={8}>
                    <Card variant="outlined">
                      <CardContent>
                        {SearchForm({
                          ...props,
                        })}
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={1}/>
                  <Grid item xs={3}>
                  </Grid>
                </Grid>
              </section>
              <section className="result-table">
                <Typography component="h5" variant="h5" color="primary">{intl('profile.superAdmin.searchStudentPage.result')}</Typography>
                <StudentsTable
                  {...props}
                  {...props.actions}
                  students={props.searchResult.students}
                  total={props.searchResult.total || 0}
                  setCount={props.actions.setPaginationCount}
                  excludeTeacher={true}
                  userCategoryId={1}
                />
              </section>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}


function SearchForm({
  actions,
  searchValue,
  selectedSchoolId,
  selectedTeacherId,
  selectedGroupId,
  playedAt,
  schoolSelectOptions,
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
          <FormControl style={{minWidth: 200}}>
            <Select
              value={selectedSchoolId}
              onChange={(event) => actions.setSchoolIdAndSetTeacherSelectOptions(event.target.value)}
            >
              <MenuItem value="__all__">{intl('profile.superAdmin.searchStudentPage.all')}</MenuItem>
              {schoolSelectOptions.map((school) => (
                <MenuItem value={school.id} key={school.id}>{school.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{intl('profile.superAdmin.searchStudentPage.filterBySchool')}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl disabled={selectedSchoolId === '__all__'} style={{minWidth: 200}}>
            <Select
              value={selectedTeacherId}
              onChange={(event) => actions.setTeacherIdAndSetGroupSelectOptions(event.target.value)}
            >
              <MenuItem value="__all__">{intl('profile.superAdmin.searchStudentPage.all')}</MenuItem>
              {teacherSelectOptions.map((teacher) => (
                <MenuItem value={teacher.id} key={teacher.id}>{teacher.first_name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{intl('profile.superAdmin.searchStudentPage.filterByTeacher')}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl disabled={selectedTeacherId === '__all__'} style={{minWidth: 200}}>
            <Select
              value={selectedGroupId}
              onChange={(event) => actions.setGroupId(event.target.value)}
            >
              <MenuItem value="__all__">{intl('profile.superAdmin.searchStudentPage.all')}</MenuItem>
              <MenuItem value="__empty__">{intl('profile.superAdmin.searchStudentPage.withoutGroup')}</MenuItem>
              {groupSelectOptions.map((group) => (
                <MenuItem value={group.id} key={group.id}>{group.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{intl('profile.superAdmin.searchStudentPage.filterByGroups')}</FormHelperText>
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
              helperText={intl('profile.superAdmin.searchStudentPage.filterByGameDate')}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item>
          <FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >{intl('profile.superAdmin.searchStudentPage.search')}</Button>
          </FormControl>
        </Grid>
      </Grid>
    </CustomForm>
  );
}
