import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {history} from '../../../index';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Edit, Email, Phone} from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import {STUDENT_ID, USER_CATEGORY_NAME} from '../../../reducers/user/fixture';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import BarChartIcon from '@material-ui/icons/BarChart';
import {intl} from '../../../routes/AppRoot';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default (props) => {
  const classes = useStyles();

  const {lookUpStudent, teacher, actions, studentId} = props;
  const {studentAccesses} = lookUpStudent;
  const person = teacher || lookUpStudent;
  person.id = (teacher && teacher.id) || studentId;

  React.useEffect(() => {
    actions.getStudent(person.id);
  }, [actions, person.id]);

  return (
    <Card className={classes.root}>
      <Dialog
        open={lookUpStudent.showStudentAccesses}
        onClose={actions.hideStudentAccesses}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography>{intl('profile.card.studentProfile.access')}</Typography>
            </Grid>
            <Grid item>
              <IconButton
                color="primary"
                onClick={() => history.push(`/change-child-password/${person.id}`)}
              >
                <Edit/>
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
                        Логин: {lookUpStudent.username}<br/>
                        Пароль: {studentAccesses.student_password}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={actions.hideStudentAccesses} color="primary" autoFocus>
            {intl('profile.card.studentProfile.close')}
          </Button>
        </DialogActions>
      </Dialog>
      <CardContent>
        <Grid container spacing={1} alignItems='center'>
          <Grid item xs={9}>
            <Typography variant="h5" component="h3">{person.first_name} {person.last_name}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography color='secondary'
              variant='subtitle2'>{intl(USER_CATEGORY_NAME[person.category_id])}</Typography>
          </Grid>
          <Grid item xs={12}>
            <br/>
          </Grid>
          <div>
            <Grid container spacing={1} alignItems='center'>
              <Grid item xs={2}>
                {(person.category_id !== STUDENT_ID && <Phone color='primary'/>) || (person.category_id === STUDENT_ID && <StarBorderIcon color='primary'/>)}
              </Grid>
              <Grid item xs={10}>
                <Typography variant="subtitle1"><Box
                  fontWeight="fontWeightLight">{person.phone || person.rating}</Box></Typography>
              </Grid>
              <Grid item xs={2}>
                {(person.category_id !== STUDENT_ID && <Email color='primary'/>) || (person.category_id === STUDENT_ID && <BarChartIcon color='primary'/>)}
              </Grid>
              <Grid item xs={10}>
                <Typography variant="subtitle1"><Box
                  fontWeight="fontWeightLight">{person.email || person.order + 1}</Box></Typography>
              </Grid>
              <Grid item xs={12}>
                <Box paddingTop={2}/>
              </Grid>
              <Grid item xs={12}>
                <Button onClick={() => actions.showStudentAccesses(person.id)} color='primary'
                  variant='contained' size='small'>{intl('profile.card.studentProfile.showAccesses')}</Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </CardContent>
    </Card>
  );
};
