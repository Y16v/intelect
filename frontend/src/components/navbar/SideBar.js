import React from 'react';
import clsx from 'clsx';
import {useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Collapse from '@material-ui/core/Collapse';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useStyles} from './style';
import AppSideBar from './AppBar';
import {AccountBox, Lock} from '@material-ui/icons';
import ReitingIcon from '@material-ui/icons/ShowChart';
import {Box} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {intl} from '../../routes/AppRoot';

export default function SideBar(props) {
  const {actions, profile, locale} = props;

  React.useEffect(() => {
    actions.getCurrentUser();
  }, [actions]);

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getClass = (isOpen) => clsx(classes.drawer, {
    [classes.drawerOpen]: isOpen,
    [classes.drawerClose]: !isOpen,
  });

  const renderToolBar = () => (
    <div className={classes.toolbar}>
      <IconButton color="inherit" onClick={handleDrawerClose}>
        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
      </IconButton>
    </div>);

  const renderUser = () => (
    <List>
      <ListItem>
        <ListItemIcon>
          <AccountCircleIcon htmlColor="#fff"/>
        </ListItemIcon>
        <ListItemText primary={`${profile.username}`}/>
      </ListItem>
      <Collapse in={true} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ReitingIcon htmlColor="#fff"/>
            </ListItemIcon>
            <Link style={{color: 'white', textDecoration: 'none'}} to={'/game/rating'}>
              <ListItemText primary={intl('navBar.sideBar.ratingStudent')}/>
            </Link>
          </ListItem>
          <ListItem className={classes.nested} button onClick={() => actions.pushToProfile(profile)}>
            <ListItemIcon>
              <AccountBox htmlColor="#fff"/>
            </ListItemIcon>
            <ListItemText primary={intl('navBar.sideBar.profile')}/>
          </ListItem>
          <ListItem className={classes.nested} button onClick={() => actions.pushToChangePassword()}>
            <ListItemIcon>
              <Lock htmlColor="#fff"/>
            </ListItemIcon>
            <ListItemText primary={intl('navBar.sideBar.changePassword')}/>
          </ListItem>
          <ListItem button className={classes.nested} onClick={actions.logout}>
            <ListItemIcon>
              <ExitToAppIcon htmlColor="#fff"/>
            </ListItemIcon>
            <ListItemText primary={intl('navBar.sideBar.logout')}/>
          </ListItem>
        </List>
      </Collapse>
    </List>);

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppSideBar open={open} locale={locale} actions={actions} classes={classes} handleOpen={handleDrawerOpen}/>
      <Drawer
        variant="permanent"
        className={getClass(open)}
        classes={{
          paper: getClass(open),
        }}
        open={open}>
        <Box style={{height: '100%', background: 'rgb(1, 0, 166)', color: '#fff'}}>
          {renderToolBar()}
          <Divider/>
          {renderUser()}
          <Divider/>
        </Box>
      </Drawer>
    </div>
  );
}
