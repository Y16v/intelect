import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {ADMIN_ID, SUPER_ADMIN_ID, USER_CATEGORY_PUSH} from '../../reducers/user/fixture';
import './navBar.css';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CustomLink from '../common/CustomLink';
import Menu from '@material-ui/core/Menu';
import {AccountCircle} from '@material-ui/icons';
import {intl} from '../../routes/AppRoot';


const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(8),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  titleContainer: {
    flexGrow: 1,
  },
  title: {
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
    width: 'auto',
    display: 'inline-block',
  },
}));


export default function HideAppBar(props) {
  const classes = useStyles();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = React.useState(null);
  const profile = props.profile;

  React.useEffect(() => {
    props.actions.getCurrentUser();
  }, [props.actions, props.actions.getCurrentUser]);

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <Menu
        id="simple-menu"
        anchorEl={menuAnchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={() => setMenuAnchorEl(null)}
      >
        <CustomLink to="/"
          onClick={() => setMenuAnchorEl(null)}
          tag={MenuItem}
        >{intl('home')}</CustomLink>
        {profile.category_id === SUPER_ADMIN_ID && (
          <CustomLink to="/my_schools/package-proposals"
            onClick={() => setMenuAnchorEl(null)}
            tag={MenuItem}
          >{intl('profile.navBar.packageRequests')}</CustomLink>
        )}
        {(profile.category_id === SUPER_ADMIN_ID || profile.category_id === ADMIN_ID) && (
          <CustomLink to={profile.category_id === SUPER_ADMIN_ID ?
                        '/super-admin/search-student' :
                        '/school-admin-page/search-students'}
          tag={MenuItem}
          onClick={() => setMenuAnchorEl(null)}
          >{intl('profile.navBar.searchStudent')}</CustomLink>
        )}
        <CustomLink to="/games"
          onClick={() => setMenuAnchorEl(null)}
          tag={MenuItem}
        >{intl('profile.navBar.game')}</CustomLink>
        <CustomLink to="/game/rating"
          onClick={() => setMenuAnchorEl(null)}
          tag={MenuItem}
        >{intl('profile.navBar.ratingStudent')}</CustomLink>
      </Menu>

      <AppBar>
        <Container>
          <Toolbar>
            <IconButton edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={(event) => setMenuAnchorEl(event.currentTarget)}
            >
              <MenuIcon/>
            </IconButton>
            <div className={classes.titleContainer}>
              <CustomLink
                className={classes.title}
                to={USER_CATEGORY_PUSH[profile.category_id] || '/'}
                tag={Typography}
                variant="h5"
              >
                {intl('myProfile')}
              </CustomLink>
            </div>
            <div>
              <select onChange={(a) => props.actions.setLocale(a.target.value)} name="lang" id="lang" defaultValue={props.locale}>
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
            </div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event) => setProfileMenuAnchorEl(event.currentTarget)}
              color="inherit"
            >
              <AccountCircle/>
            </IconButton>
            <Menu
              anchorEl={profileMenuAnchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              open={Boolean(profileMenuAnchorEl)}
              onClose={() => setProfileMenuAnchorEl(null)}
            >
              <CustomLink to="/change_password"
                onClick={() => setProfileMenuAnchorEl(null)}
                tag={MenuItem}
              >{intl('changePassword')}
              </CustomLink>
              <MenuItem onClick={props.actions.logout}>
                {intl('logout')}
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
