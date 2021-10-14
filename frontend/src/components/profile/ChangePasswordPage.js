import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {Container} from '@material-ui/core';
import NavBarContainer from '../../containers/profile/NavBarContainer';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {CloudDone, Visibility, VisibilityOff} from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import clsx from 'clsx';
import FormHelperText from '@material-ui/core/FormHelperText';
import CustomForm from '../common/CustomForm';
import {intl} from '../../routes/AppRoot';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: 400,
  },
}));


export default function ChangePasswordPage({
  actions,
  changePasswordData,
  showPasswordFields,
  fieldErrors,
  changePasswordSuccess,
  finish,
  error,
}) {
  const classes = useStyles();

  React.useEffect(() => {
    actions.resetErrors();
  }, [
    actions,
    changePasswordData.oldPassword,
    changePasswordData.newPassword,
    changePasswordData.confirmPassword,
  ]);

  React.useEffect(() => {
    actions.clearState();
  }, [actions, finish]);
  return (
    <div style={{backgroundColor: '#ecf0f1', minHeight: '97vh'}}>
      <Box paddingTop={2}>
        <NavBarContainer/>
        <Container>
          <Dialog
            open={!!changePasswordSuccess}
            onClose={() => actions.finishChangePassword()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{intl('profile.changePasswordPage.changePasswordAccess')}</DialogTitle>
            <DialogContent style={{alignContent: 'center'}}>
              <CloudDone fontSize='large' color='primary'/>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => actions.finishChangePassword()} color="primary" autoFocus>
                {intl('ok')}
              </Button>
            </DialogActions>
          </Dialog>
          <Card style={{alignContent: 'center'}}>
            <CardContent>
              <Typography variant="h5" component="h2">{intl('profile.changePasswordPage.changePassword')}</Typography>
              <Box paddingTop={2}/>
              <CustomForm onSubmit={actions.changePassword}>
                <Grid container>
                  <Grid item xs={12}>
                    <FormControl className={clsx(classes.margin, classes.textField)}
                      error={!!fieldErrors.oldPassword}>
                      <InputLabel shrink htmlFor="old-password">{intl('profile.changePasswordPage.oldPassword')}</InputLabel>
                      <Input
                        id="old-password"
                        type={showPasswordFields.oldPassword ? 'text' : 'password'}
                        value={changePasswordData.oldPassword}
                        onChange={(event) => actions.setChangePasswordData('oldPassword', event.target.value)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => actions.setShowPasswordField('oldPassword', !showPasswordFields.oldPassword)}
                            >
                              {showPasswordFields.oldPassword ? <Visibility/> :
                                                                <VisibilityOff/>}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText id="old-password">{fieldErrors.oldPassword}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={clsx(classes.margin, classes.textField)}
                      error={!!fieldErrors.newPassword}>
                      <InputLabel shrink htmlFor="new-password">{intl('profile.changePasswordPage.newPassword')}</InputLabel>
                      <Input
                        id="new-password"
                        type={showPasswordFields.newPassword ? 'text' : 'password'}
                        value={changePasswordData.newPassword}
                        onChange={(event) => actions.setChangePasswordData('newPassword', event.target.value)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => actions.setShowPasswordField('newPassword', !showPasswordFields.newPassword)}
                            >
                              {showPasswordFields.newPassword ? <Visibility/> :
                                                                <VisibilityOff/>}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText id="new-password">{fieldErrors.newPassword}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={clsx(classes.margin, classes.textField)}
                      error={!!fieldErrors.confirmPassword}>
                      <InputLabel shrink htmlFor="confirm-password">{intl('profile.changePasswordPage.confirmPassword')}</InputLabel>
                      <Input
                        id="confirm-password"
                        type={showPasswordFields.confirmPassword ? 'text' : 'password'}
                        value={changePasswordData.confirmPassword}
                        onChange={(event) => actions.setChangePasswordData('confirmPassword', event.target.value)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => actions.setShowPasswordField('confirmPassword', !showPasswordFields.confirmPassword)}
                            >
                              {showPasswordFields.confirmPassword ? <Visibility/> :
                                                                <VisibilityOff/>}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText
                        id="confirm-password">{fieldErrors.confirmPassword}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color='secondary' variant='inherit'>{error}</Typography>
                  </Grid>
                  <Box paddingTop={2}/>
                  <Grid item xs={3}>
                    <Button
                      size="medium"
                      color="primary"
                      variant="contained"
                      onClick={() => actions.changePassword()}
                    >{intl('profile.changePasswordPage.change')}</Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      type="submit"
                      size="medium"
                      color="secondary"
                      variant="contained"
                      onClick={() => actions.finishChangePassword()}
                    >
                      {intl('cancel')}
                    </Button>
                  </Grid>
                </Grid>
              </CustomForm>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </div>
  );
}
