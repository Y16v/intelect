import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import '../../../styles/fullScreenDialog.css';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import {Container} from '@material-ui/core';
import {useStyles} from '../styles';
import List from '@material-ui/core/List';
import {intl} from '../../../routes/AppRoot';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ResultModal({
  isSubmitLoading,
  open, handleClose, onNext, openSettings, onFinish,
  currentAnswer, expect, spentTime, isError, openAllResultModal,

}) {
  const classes = useStyles();
  const getSize = (number) => {
    const length = `${number}`.length;
    if (length <= 19) return '7.4vw';
    if (length <= 20) return '6.8vw';
    if (length <= 21) return '6.4vw';
    if (length <= 25) return '5.4vw';
    else return '4.7vw';
  };

  return (
    <div className="multiplier-result-modal">
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <div className="multiplier-result-modal-background-img">
          <AppBar className="multiplier-result-modal-app-bar">
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon/>
              </IconButton>
              <Link className="multiplier-result-modal-title-form" to={'/games'}>
                <Typography variant="h6">
                  {intl('game')}
                </Typography>
              </Link>
              <Typography variant="h6"
                className="multiplier-result-modal-open-all-result-modal"
                onClick={openAllResultModal}
              >
                {intl('viewResult')}
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            <Container maxWidth="lg">
              <div className="multiplier-result-modal-MinContainer">
                <div className="multiplier-result-modal-body">
                  <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Typography variant="h3" component="h2"
                      style={{color: 'white', fontWeight: '600', userSelect: 'none'}}>
                      {intl('yourReplace')}
                    </Typography>
                    <div className="multiplier-result-modal-paper"
                      style={{
                        color: isError ? 'red' : 'white',
                        fontSize: getSize(currentAnswer),
                        userSelect: 'none',
                      }}>
                      {currentAnswer || 'NONE'}
                    </div>
                    <Typography variant="h3" component="h2"
                      style={{color: 'white', fontWeight: '600', userSelect: 'none'}}>
                      {intl('correctAnswer')}
                    </Typography>
                    <div className="multiplier-result-modal-paper"
                      style={{
                        color: isError ? 'red' : 'white',
                        fontSize: getSize(expect),
                        userSelect: 'none',
                      }}>
                      {`${expect}`}
                    </div>
                    <div className="multiplier-result-modal-big-paper">
                      {`${spentTime} c.`}
                    </div>
                  </Grid>
                </div>
                <Box marginTop={1}>
                  <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Button className={classes.bottomButton}
                        style={{color: 'white', fontWeight: 'bold'}} size="medium"
                        onClick={onFinish}
                        disabled={isSubmitLoading}
                      >
                        {intl('toComplete')}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button className={classes.bottomButton}
                        style={{color: 'white', fontWeight: 'bold'}} size="medium"
                        onClick={openSettings}
                      >
                        {intl('menu')}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button className={classes.bottomButton}
                        style={{color: 'white', fontSize: 'none', fontWeight: 'bold'}}
                        size="medium"
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
