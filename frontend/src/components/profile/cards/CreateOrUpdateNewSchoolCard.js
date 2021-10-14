import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Container} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Form from '../../common/CustomForm';
import {intl} from '../../../routes/AppRoot';


const useStyles = makeStyles((theme) => ({
  rootFormControl: {
    '& > *': {
      margin: theme.spacing(2),
      width: 400,
    },
  },
}));


export default (props) => {
  const classes = useStyles();
  const initialSchool = props.isUpdate ? props.school : {};
  const initialSchoolAdmin = props.isUpdate ? props.schoolAdmin : {};

  const [schoolNameError, setSchoolNameError] = React.useState('');
  const [schoolAdminNameError, setSchoolAdminNameError] = React.useState('');
  const [schoolAdminSurnameError, setSchoolAdminSurnameError] = React.useState('');
  const [schoolAdminUsernameError, setSchoolAdminUsernameError] = React.useState('');
  const [schoolAdminPhoneError, setSchoolAdminPhoneError] = React.useState('');
  const [schoolAdminEmailError, setSchoolAdminEmailError] = React.useState('');


  const _validate_form_data = () => {
    if (!props.school.name) {
      return setSchoolNameError('Это поле обязательно');
    } else {
      setSchoolNameError('');
    }
    if (!props.schoolAdmin.first_name) {
      return setSchoolAdminNameError('Это поле обязательно');
    } else {
      setSchoolAdminNameError('');
    }
    if (!props.schoolAdmin.last_name) {
      return setSchoolAdminSurnameError('Это поле обязательно');
    } else {
      setSchoolAdminSurnameError('');
    }
    if (!props.schoolAdmin.username) {
      return setSchoolAdminUsernameError('Это поле обязательно');
    } else {
      setSchoolAdminUsernameError('');
    }
    if (!props.schoolAdmin.phone) {
      return setSchoolAdminPhoneError('Это поле обязательно');
    } else {
      setSchoolAdminPhoneError('');
    }
    if (props.schoolAdmin.phone.length !== 13 ) {
      return setSchoolAdminPhoneError('Некорректный номер телефона');
    } else {
      setSchoolAdminPhoneError('');
    }
    if (!props.schoolAdmin.email) {
      return setSchoolAdminEmailError('Это поле обязательно');
    } else {
      setSchoolAdminEmailError('');
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.schoolAdmin.email)) {
      return setSchoolAdminEmailError('Введите правильный email адрес');
    } else {
      setSchoolAdminEmailError('');
    }
    return true;
  };

  const createOrUpdateSchoolWithAdmin = () => {
    if (_validate_form_data()) {
      props.actions.createNewOrUpdateSchoolWithAdmin(props.school, props.schoolAdmin, props.isUpdate);
    }
  };
  const {schoolId, isUpdate, actions} = props;

  React.useEffect(() => {
    if (isUpdate) {
      actions.getSchoolWithAdmin(schoolId);
    }
  }, [schoolId, isUpdate, actions]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">{props.isUpdate ? intl('profile.card.createOrUpdate.Update') : intl('schoolAdmin.studentTable.create')}</Typography>
        <Box/>
        <Container>
          <Form
            onSubmit={createOrUpdateSchoolWithAdmin}
            className={classes.rootFormControl}
          >
            <TextField
              id="school_name"
              label={intl('profile.card.createOrUpdate.schoolName')}
              InputLabelProps={{shrink: true}}
              error={!!schoolNameError}
              helperText={schoolNameError}
              value={initialSchool.name}
              onChange={(event) => props.actions.setSchoolValue('name', event.target.value)}
            />
            <TextField
              id="name"
              label={intl('profile.card.createOrUpdate.schoolAdminName')}
              InputLabelProps={{shrink: true}}
              error={!!schoolAdminNameError}
              helperText={schoolAdminNameError}
              value={initialSchoolAdmin.first_name}
              onChange={(event) => props.actions.setSchoolAdminValue('first_name', event.target.value)}
            />
            <TextField
              id="surname"
              label={intl('profile.card.createOrUpdate.schoolAdminSurName')}
              InputLabelProps={{shrink: true}}
              error={!!schoolAdminSurnameError}
              helperText={schoolAdminSurnameError}
              value={initialSchoolAdmin.last_name}
              onChange={(event) => props.actions.setSchoolAdminValue('last_name', event.target.value)}
            />
            <TextField
              id="username"
              error={!!schoolAdminUsernameError}
              InputLabelProps={{shrink: true}}
              label={intl('profile.card.createOrUpdate.schoolAdminUserName')}
              helperText={schoolAdminUsernameError}
              value={initialSchoolAdmin.username}
              onChange={(event) => props.actions.setSchoolAdminValue('username', event.target.value)}
            />
            <TextField
              id="phone"
              label={intl('profile.card.createOrUpdate.schoolAdminPhone')}
              error={!!schoolAdminPhoneError}
              helperText={schoolAdminPhoneError}
              InputLabelProps={{shrink: true}}
              value={initialSchoolAdmin.phone}
              onChange={(event) => props.actions.setSchoolAdminValue('phone', event.target.value)}
            />
            <TextField
              id="email"
              InputLabelProps={{shrink: true}}
              label="Email"
              error={!!schoolAdminEmailError}
              helperText={schoolAdminEmailError}
              value={initialSchoolAdmin.email}
              onChange={(event) => props.actions.setSchoolAdminValue('email', event.target.value)}
            />
            <FormControlLabel control={
              <Checkbox
                id='is_active'
                checked={props.school.is_active !== undefined ? props.school.is_active : true}
                onChange={(event) => props.actions.setSchoolValue('is_active', !props.school.is_active)}
              />
            } label={intl('profile.card.createOrUpdate.activateSchool')}
            />
            <Box>
              <Typography color='error' variant='inherit'>{props.error}</Typography>
            </Box>
            <Grid container>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  size="medium"
                  color="primary"
                  variant='contained'
                >{props.isUpdate ? intl('profile.card.createOrUpdate.Update') : intl('profile.card.createOrUpdate.create')}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  size="medium"
                  color="secondary"
                  variant='contained'
                  onClick={() => props.actions.finishUpdateOrCreate()}
                >
                  {intl('profile.card.createOrUpdate.cancel')}
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Container>
      </CardContent>
    </Card>
  );
};
