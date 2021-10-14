import React, {useRef} from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {CardContent, Container} from '@material-ui/core';
import StudentProfileContainer from '../../../containers/profile/student/StudentProfileContainer';
import NavBarContainer from '../../../containers/profile/NavBarContainer';
import ChartResult from '../../../containers/profile/teacher/ChartResultContainer';
import StudentResultDateRanges from '../studentPrifile/StudentResultDateRanges';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CustomLink from '../../common/CustomLink';
import Button from '@material-ui/core/Button';
import {History, Print} from '@material-ui/icons';
import GameResultsTable from '../common/GameResultsTable';
import {makeStyles} from '@material-ui/core/styles';
import ReactToPrint from 'react-to-print';
import StudentResultPrint from './StudentResultPrint';
import {intl} from '../../../routes/AppRoot';


const useStyles = makeStyles((theme) => ({
  resultsTableContainer: {
    marginTop: theme.spacing(2),
  },
}));

export default (props) => {
  const {actions, match, selectedDateRange} = props;

  React.useEffect(() => {
    actions.getStudent(match.params.studentId);
  }, [
    actions,
    actions.getStudent,
    match.params.studentId,
  ]);
  React.useEffect(() => {
    actions.setResultsDateRange(null, null);
  }, [
    actions,
    actions.setResultsDateRange,
    match.params.studentId,
  ]);
  React.useEffect(() => {
    actions.getStudentResults(
        match.params.studentId,
    );
  }, [
    actions,
    actions.getStudentResults,
    selectedDateRange.startDate,
    selectedDateRange.endDate,
    match.params.studentId,
  ]);

  return (
    <div style={{backgroundColor: '#ecf0f1', minHeight: '100vh'}}>
      <Box paddingTop={2}>
        <Container>
          <NavBarContainer/>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <ResultsSection {...props}/>
            </Grid>
            <Grid item xs={3}>
              <StudentProfileContainer studentId={props.match.params.studentId}/>
            </Grid>
            <Grid item xs={9}>
              <ChartResult/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};


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
            <Typography variant="h5" component="h2">{intl('profile.teacher.studentPage.resultsStudents')}</Typography>
          </Grid>
          <Grid item container spacing={2} xs={6} md={6} lg={6} xl={6} direction="row-reverse">
            <Grid item>
              <CustomLink to={`/result-archives/${props.student.id}`}
                tag={Button}
                size="small"
                variant="contained"
                startIcon={<History/>}
                color="primary">{intl('profile.teacher.studentPage.archive')}</CustomLink>
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
                  {intl('profile.teacher.studentPage.point')}
                </Button>
              )}
              content={() => componentRef.current}
              />
              <div style={{display: 'none'}}>
                <StudentResultPrint ref={componentRef}
                  lookUpResults={props.studentResults}
                  lookUpStudent={props.lookUpStudent}
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
