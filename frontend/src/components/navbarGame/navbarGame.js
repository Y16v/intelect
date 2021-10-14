import React from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Container from '@material-ui/core/Container/Container';
import FormControl from '@material-ui/core/FormControl/FormControl';
import Select from '@material-ui/core/Select/Select';
import {makeStyles} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import ButtonGroup from '@material-ui/core/ButtonGroup/ButtonGroup';
import Fab from '@material-ui/core/Fab/Fab';
import SettingsIcon from '@material-ui/icons/Settings';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import IconButton from '@material-ui/core/IconButton/IconButton';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import swal from 'sweetalert';
import {intl} from '../../routes/AppRoot';

const NavbarGame = ({actionCounts, numbers, speeds, operators, game, actions}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      paddingTop: '10px',
      paddingBottom: '10px',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    select: {
      textAlign: 'center',
      color: '#ffffff',
      ['@media(max-width: 600px)']: {
        fontSize: '14px',
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    btn: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    buttonGroup: {
      ['@media(max-width: 817px)']: {
        marginTop: '10px',
      },
    },
    form: {
      display: 'flex',
      color: '#ffffff',
      justifyContent: 'space-around',
      fontFamily: 'sans-serif',
      flexWrap: 'wrap',
      ['@media(max-width: 470px)']: {
        display: 'none',
        flexDirection: 'column',
      },

    },

    mobileForm: {
      display: 'flex',
      color: '#ffffff',
      justifyContent: 'space-around',
      fontFamily: 'sans-serif',
      flexWrap: 'wrap',
      ['@media(max-width: 470px)']: {
        flexDirection: 'column',
      },
    },

    label: {
      fontSize: '20px',
      ['@media(max-width: 600px)']: {
        fontSize: '15px',
      },
      ['@media(max-width: 470px)']: {
        textAlign: 'center',
        paddingTop: '13px',
      },

    },
    MuiSelectSelect: {
      textAlign: 'center',
    },
    buttons: {
      ['@media(max-width: 470px)']: {
        alignItems: 'center',
      },
    },
    dragMenu: {
      display: 'none',
      flexDirection: 'column',
      ['@media(max-width: 470px)']: {
        display: 'flex',
      },
    },
  }));

  const classes = useStyles();
  const [] = React.useState({
    operations: '+',
    numbers: '1',
    speeds: '1',
    actions: 2,
  });


  const handleChange = (name) => (event) => {
    actions.handleChange(name, event.target.value);
  };

  const [onMenu, offSetMenu] = React.useState(true);

  const onMenuNav = () => {
    offSetMenu(!onMenu);
  };

  function openAlertDialog() {
    swal({
      title: 'Выши задачи пропадут!',
      text: 'Вы уверены? Обнуляться все баллы и вы начнете с самого начала',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      focusConfirm: false,
      closeOnClickOutside: false,
      closeOnCancel: false,
      cancelButtonText: 'Отмена',
    }).then(((value) => {
      if (value) actions.clearGame();
    }));
  }

  const form = (onMenu ? classes.form : classes.mobileForm);
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Container>
          <form className={form}>
            <FormControl>
              <label className={classes.label}>
                {intl('navbarGame.operation')}
              </label>
              <Select
                className={classes.select}
                value={game.actionType}
                onChange={handleChange('operation_type')}
                inputProps={{
                  name: '1',
                  id: 'operations',
                }}>
                {operators.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <label className={classes.label}>
                {intl('navbarGame.number')}
              </label>
              <Select
                className={classes.select}
                value={game.countDigit}
                onChange={handleChange('digit_count')}
                inputProps={
                  {name: '1', id: 'numbers'}}>
                {numbers.map((number) => (
                  <MenuItem key={number} value={number}>{number}</MenuItem>))}
              </Select>
            </FormControl>
            <FormControl>
              <label className={classes.label}>
                {intl('navbarGame.speed')}
              </label>
              <Select
                className={classes.select}
                value={speeds.includes(game.speed) ? game.speed : ''}
                onChange={handleChange('speed')}
                inputProps={{
                  name: '2',
                  id: 'speeds',
                }}>
                {speeds.map((speed) => (
                  <MenuItem
                    key={speed}
                    value={speed}>
                    {speed}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <label htmlFor="action" className={classes.label}>
                {intl('navbarGame.action')}
              </label>
              <Select
                className={classes.select}
                value={actionCounts.includes(game.actionCount) ? game.actionCount : ''}
                onChange={handleChange('action_count')}
                inputProps={{
                  name: '1',
                  id: 'action_count',
                }}>
                {actionCounts.map((action) => (
                  <MenuItem key={action} value={action}>
                    {action}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.buttons}>
              <ButtonGroup
                className={classes.buttonGroup}
                variant="outlined"
                color="primary"
                size="large">
                <Fab variant="extended"
                  onClick={openAlertDialog}
                  aria-label="reset">
                  <RotateLeftIcon/>
                </Fab>
                <Fab variant="extended"
                  color="secondary">
                  <PlayArrowIcon/>
                </Fab>
                <Fab variant="extended">
                  <StopIcon className={classes.btn}/>
                </Fab>
                <Fab
                  variant="extended"
                  onClick={actions.openSettingsModal}>
                  <SettingsIcon/>
                </Fab>
                <Fab variant="extended" onClick={actions.openResultModal}>
                  <ThumbUpAltIcon/>
                </Fab>
              </ButtonGroup>
            </FormControl>
          </form>
          <div className={classes.dragMenu}>
            <IconButton
              color="inherit"
              size="medium"
              onClick={onMenuNav}>
              <DragHandleIcon/>
            </IconButton>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarGame;
