import React from 'react';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import {Link} from 'react-router-dom';
import {intl} from '../../routes/AppRoot';


export default function AppSideBar({open, handleOpen, classes, locale, actions}) {
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}>
      <Toolbar style={{backgroundColor: 'rgb(1, 0, 166)'}}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}>
          <MenuIcon/>
        </IconButton>
        <Link className={(classes.home)} to={'/'}>
          <Typography variant="h6" noWrap>
            {intl('navBar.appBar.Home')}
          </Typography>
        </Link>
        <div className="app-bar-ads">
          <div>
            <select onChange={(a) => actions.setLocale(a.target.value)} name="lang" id="lang" defaultValue={locale}>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </Toolbar>

    </AppBar>
  );
}
