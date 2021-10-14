import React, {useRef} from 'react';
import NavBarContainer from '../../../containers/profile/NavBarContainer';
import './student-profile.css';
import {Card, CardContent, Table, TableBody} from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import {USER} from '../../../store/storage_kets';
import ChartResult from '../../../containers/profile/teacher/ChartResultContainer';
import {Redirect} from 'react-router-dom';
import {USER_CATEGORY_PUSH} from '../../../reducers/user/fixture';
import GameResultsTable from '../common/GameResultsTable';
import Grid from '@material-ui/core/Grid';
import CustomLink from '../../common/CustomLink';
import Button from '@material-ui/core/Button';
import {History, Print} from '@material-ui/icons';
import StudentResultDateRanges from './StudentResultDateRanges';
import {makeStyles} from '@material-ui/core/styles';
import StudentResultPrint from '../teacher/StudentResultPrint';
import ReactToPrint from 'react-to-print';
import {intl} from '../../../routes/AppRoot';


const useStyles = makeStyles((theme) => ({
  resultsTableContainer: {
    marginTop: theme.spacing(2),
  },
}));


export default function StudentProfilePage(props) {
  const {actions, studentResults} = props;
  const user = JSON.parse(localStorage.getItem(USER));
  const profile = props.getStudentProfilePageResult;
  const teacher = profile.teacher || {};

  React.useEffect(() => {
    actions.getStudentProfilePage();
  }, [actions, actions.getStudentProfilePage]);

  React.useEffect(() => {
    actions.setResultsDateRange(null, null);
  }, [
    actions,
    actions.setResultsDateRange,
    profile.id,
  ]);

  const studentResultConst = (studentResults.selectedDateRange && studentResults.selectedDateRange.startDate);
  const studentResultConst1 = (studentResults.selectedDateRange && studentResults.selectedDateRange.endDate);
  React.useEffect(() => {
    if (studentResults.selectedDateRange && profile.id) {
      actions.getStudentResults(
          profile.id,
      );
    }
  }, [
    actions,
    actions.getStudentResults,
    studentResultConst,
    studentResultConst1,
    profile.id,
  ]);

  return (
    <div className="student-profile-page">
      {user.id !== 4 && <Redirect to={USER_CATEGORY_PUSH[user.category_id]}/>}
      <NavBarContainer/>
      <div className="student-profile-page-content">
        <Card className="student-profile-page-card">
          <Table size="small" className="info-table">
            <TableBody>
              <TableRow>
                <TableCell variant="head" className="info-label">
                  <div className="student-profile-page-rating-contain"/>
                </TableCell>
                <TableCell><Typography variant="h4" component="h2" style={{
                  marginTop: '1rem',
                  fontWeight: 'bold',
                }}>{profile.order + 1 || ''}</Typography></TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" className="info-label">{intl('profile.studentProfile.studentProfilePage.lastName')}</TableCell>
                <TableCell>{profile.last_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" className="info-label">{intl('profile.studentProfile.studentProfilePage.firstName')}</TableCell>
                <TableCell>{profile.first_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" className="info-label">{intl('profile.studentProfile.studentProfilePage.login')}</TableCell>
                <TableCell>{profile.username}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" className="info-label">{intl('profile.studentProfile.studentProfilePage.teacher')}</TableCell>
                <TableCell>{teacher.last_name + ' ' + teacher.first_name }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" className="info-label">{intl('profile.studentProfile.studentProfilePage.school')}</TableCell>
                <TableCell>{profile.school_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head" className="info-label">{intl('profile.studentProfile.studentProfilePage.score')}</TableCell>
                <TableCell><Typography variant="h6" component="h5" style={{
                  fontWeight: '600',
                }}>{profile.rating}</Typography></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
        <div className="student-profile-page-results">
          <ChartResult/>
        </div>
      </div>
      <div className="student-profile-page-graphic">
        <ResultsSection {...props.studentResults} actions={props.actions} profile={profile}/>
      </div>
    </div>
  );
}


function ResultsSection(props) {
  const componentRef = useRef();
  const classes = useStyles();
  const onSetDateRange = (from, to) => {
    if (props.selectedDateRange.startDate === from) {
      return;
    }
    props.actions.setResultsDateRange(from, to);
  };
  return (
    <Card>
      <CardContent>
        <Grid container justify="space-between" className="mb2-l">
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography variant="h5" component="h2">{intl('profile.studentProfile.studentProfilePage.studentResult')}</Typography>
          </Grid>
          <Grid item container spacing={2} xs={6} md={6} lg={6} xl={6} direction="row-reverse">
            <Grid item>
              <CustomLink to={`/result-archives/${props.profile.id}`}
                tag={Button}
                size="small"
                variant="contained"
                startIcon={<History/>}
                color="primary">{intl( 'profile.studentProfile.studentProfilePage.archives')}</CustomLink>
            </Grid>
            <Grid item>
              <ReactToPrint trigger={() => (
                <Button
                  disabled={props.isResultsLoading}
                  variant='contained'
                  color='primary'
                  size='small'
                  startIcon={<Print/>}
                >
                  {intl('profile.studentProfile.studentProfilePage.print')}
                </Button>
              )}
              content={() => componentRef.current}
              />
              <div style={{display: 'none'}}>
                <StudentResultPrint ref={componentRef}
                  lookUpResults={props.studentResults}
                  lookUpStudent={props.getStudentProfilePageResult}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <StudentResultDateRanges
          dateRanges={props.dateRanges}
          selectedDateRange={props.selectedDateRange}
          setDateRange={onSetDateRange}
        />
        <div className={classes.resultsTableContainer}>
          <GameResultsTable
            results={props.studentResults}
            showResultItems={props.showResultItems}
            openResultItemsDialog={props.actions.openResultItemsDialog}
            closeResultItemsDialog={props.actions.closeResultItemsDialog}
            isLoading={props.isResultsLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
}
