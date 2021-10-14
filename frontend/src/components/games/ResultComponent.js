import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import '../../styles/fullScreenDialog.css';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {useStyles} from './styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Container, Table} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import {intl} from '../../routes/AppRoot';


const BorderLinearProgress = withStyles({
  root: {
    backgroundColor: 'white',
    textAlign: 'center',
  },
  bar: {
    borderRadius: '5vw',
    backgroundColor: '#ff9b00',
  },
})(LinearProgress);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ResultComponent({
  isSubmitLoading,
  total, rightTotal, exactAnswer, currentAnswer, isEqual,
  open, handleClose, onNext, onSubmitResult, onClickSettings, openAllResults,
}) {
  const classes = useStyles();
  const floor = (v) => parseFloat((v || 0).toFixed(1));
  const percent = floor(rightTotal / total * 100);
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{className: 'result-modal-root'}}
      >
        <div>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon/>
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {''}
              </Typography>
              <Button color="inherit" onClick={openAllResults} className={classes.saveButton}>
                {intl('game.resultComponent')}
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <Container maxWidth="md">
              <div className={classes.resultMinContainer}>
                <Grid container justify="center">
                  <Grid item className={classes.formContainer}>
                    <div className={classes.minFormContainer}>
                      <Typography
                        className={classes.titleTypography}
                        align="center"
                      >{intl('game.yourResponse')}
                      </Typography>
                    </div>
                    <div className={classes.centerForm}>
                      <Typography
                        className={classes.muiTypography}
                        style={{color: isEqual ? 'white' : '#E74C3C'}}
                        align="center"
                        noWrap
                      >{`${currentAnswer === '' ? 'NONE' : currentAnswer}`}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item wrap="nowrap" className={classes.formContainer}>
                    <div className={classes.minFormContainer}>
                      <Typography
                        className={classes.titleTypography}
                        align="center"
                      >{intl('game.correctAnswer')}
                      </Typography>
                    </div>
                    <div className={classes.centerForm}>
                      <Typography
                        className={classes.muiTypography}
                        align="center"
                        noWrap
                      >{exactAnswer}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
                <Grid container className={classes.resultContainer} justify="center"
                  alignItems="center">
                  <Grid item xs={12} md={5} lg={5} sm={5} className={classes.resultTextContainer}>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" className={classes.tableText} scope="row">
                            {intl('game.numberOfQuestions:')}
                          </TableCell>
                          <TableCell align="right"
                            className={classes.tableText}>{total}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" className={classes.tableText} scope="row">
                            {intl('game.rightAnswers')}
                          </TableCell>
                          <TableCell align="right"
                            className={classes.tableText}>{rightTotal}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" className={classes.tableText} scope="row">
                            {intl('game.incorrectAnswers')}
                          </TableCell>
                          <TableCell align="right"
                            className={classes.tableText}>{total - rightTotal}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                  <div className={classes.resultPercentContainer}>
                    <Typography
                      className={classes.resultProgressTypography}
                      align="center"
                    >{percent + '%'}
                    </Typography>
                    <Box>
                      <BorderLinearProgress
                        className={classes.resultProgress}
                        value={percent}
                        variant='determinate'/>
                    </Box>
                  </div>
                </Grid>
                <Box marginTop={1}>
                  <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={4}
                  >
                    <Grid item>
                      <Button className={classes.bottomButton} size="medium"
                        onClick={onSubmitResult}
                        disabled={isSubmitLoading}
                      >
                        {intl('toComplete')}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button className={classes.bottomButton} size="medium"
                        onClick={onClickSettings}
                      >
                        {intl('settings')}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button className={classes.bottomButton} size="medium"
                        autoFocus
                        onClick={onNext}
                      >
                        {intl('next')}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </Container>
          </List>
        </div>
      </Dialog>
    </div>
  );
}
