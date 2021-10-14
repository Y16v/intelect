import React, {useRef} from 'react';
import NavBarContainer from '../../../containers/profile/NavBarContainer';
import {Container} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Print} from '@material-ui/icons';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ChartResult from '../teacher/ChartResult';
import NotFoundOrPermissionDenied from '../../common/NotFoundOrPermissionDenied';
import GameResultsTable from '../common/GameResultsTable';
import StudentResultDateRanges from './StudentResultDateRanges';
import ReactToPrint from 'react-to-print';
import StudentResultPrint from '../teacher/StudentResultPrint';
import {intl} from '../../../routes/AppRoot';


const useStyles = makeStyles((theme) => ({
  resultItemsAppBar: {
    position: 'relative',
  },
  resultItemsTitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  notFoundGrid: {
    height: '75vh',
  },
}));


export default function(props) {
  const {actions, student, selectedDateRange} = props;
  const studentId = props.match.params.studentId;
  React.useEffect(() => {
    actions.getStudent(studentId);
  }, [
    actions,
    actions.getStudent,
    studentId,
  ]);

  React.useEffect(() => {
    actions.setArchivesDateRange('', '');
  }, [
    actions,
    actions.setArchivesDateRange,
    student.id,
  ]);

  React.useEffect(() => {
    actions.getResultArchives(studentId);
  }, [
    actions,
    actions.getResultArchives,
    selectedDateRange.startDate,
    selectedDateRange.endDate,
    student.id,
    studentId,
  ]);


  return (
    <div>
      <NavBarContainer/>
      <GetContent {...props}/>
    </div>
  );
}


function GetContent({...props}) {
  const classes = useStyles();

  if (props.notFoundOrPermissionDenied) {
    return (
      <Container>
        <Card className="mt4-l">
          <CardContent>
            <Grid container alignContent="center" justify="center" className={classes.notFoundGrid}>
              <Grid item>
                <NotFoundOrPermissionDenied errorMessage={intl('profile.studentProfile.studentResultArchives.errorMessage')}/>;
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return <Content {...props}/>;
}


function Content({...props}) {
  const componentRef = useRef();
  return (
    <Container>
      <Card className="mt4-l">
        <CardContent>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h5" component="h2">{intl('profile.studentProfile.studentResultArchives.resultArchives')}</Typography>
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
                  {intl('profile.studentProfile.studentResultArchives.point')}
                </Button>
              )}
              content={() => componentRef.current}
              />
              <div style={{display: 'none'}}>
                <StudentResultPrint ref={componentRef}
                  lookUpResults={props.archives}
                  lookUpStudent={props.student}
                />
              </div>
            </Grid>
          </Grid>
          <div className="mt2-l">
            <StudentResultDateRanges
              dateRanges={props.dateRanges}
              selectedDateRange={props.selectedDateRange}
              setDateRange={props.actions.setArchivesDateRange}
            />
          </div>
          <div className="mt3-l">
            <GameResultsTable results={props.archives}
              showResultItems={props.showResultItems}
              {...props.actions} isLoading={props.isResultsLoading}

            />
          </div>

          <div className="mt2-l">
            <Typography variant="h5">График</Typography>
            <Container maxWidth="md" className="mt2-l">
              <ChartResult {...props.chartData}/>
            </Container>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
