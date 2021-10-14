import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SchoolIcon from '@material-ui/icons/School';
import PeopleIcon from '@material-ui/icons/People';
import WorkIcon from '@material-ui/icons/Work';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import {ADMIN_ID} from '../../reducers/user/fixture';
import {intl} from '../../routes/AppRoot';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    borderRadius: '4px',
    background: '#FFFFFF',
    marginLeft: '10px',
    minWidth: '25vw',
    minHeight: '50vh',
    marginBottom: '10px',
  },
  schoolName: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '26px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
}));

export default function ProfileCard({user, school, studentCount, teacherCount, redirectToEditSchoolAdmin}) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <Grid container
        direction="column"
        justify="center"
        alignItems="center">
        {user.category_id === ADMIN_ID && <div>
          <ListItem>
            <Grid container
              direction="row"
              justify="space-between"
              alignItems="center">
              <Typography className={classes.schoolName}>{school.name}</Typography>
              <Typography style={{
                color: '#8997B1',
                maxFontWeight: 500,
                maxFontSize: '3vw',
                maxWidth: '13vw',
                maxLineHeight: '11vh',
                maxLetterSpacing: '1vw',
              }}> {intl('game.modal.studentsListTable.school')}</Typography>
            </Grid>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PeopleIcon/>
            </ListItemIcon>
            <Typography style={{
              color: '#515151',
              maxFontWeight: '50vw',
              maxFontSize: '8vw',
              maxLineHeight: '11vh',
              maxLetterSpacing: '0.1vw',
              fontStyle: 'normal',
              maxWidth: '13vw',
            }}>
              {studentCount} {intl('schoolAdmin.profileCard.student')}
            </Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SchoolIcon/>
            </ListItemIcon>
            <Typography style={{
              color: '#515151',
              maxFontWeight: '50vw',
              maxFontSize: '8vw',
              maxLineHeight: '11vh',
              maxLetterSpacing: '0.1vw',
              fontStyle: 'normal',
              maxWidth: '13vw',
            }}>
              {teacherCount} {intl('schoolAdmin.profileCard.teacher')}
            </Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <WorkIcon/>
            </ListItemIcon>
            <Typography style={{
              color: '#515151',
              maxFontWeight: 100,
              maxFontSize: '3vw',
              maxLineHeight: '11vh',
              maxLetterSpacing: '0.1vw',
              fontStyle: 'normal',
              maxWidth: '13vw',
            }}>
              {school.package} {intl('schoolAdmin.profileCard.restOfThePackage')}
            </Typography>
          </ListItem>
          <ListItem>
            <Link to="/school-admin-page/make-package-proposal"
              style={{color: '#2196F3', fontWeight: 500, fontSize: '18px'}}
            >
              {intl('schoolAdmin.profileCard.getThePackage')}
            </Link>
          </ListItem>
        </div>}
        <ListItem style={{marginTop: 40}}>
          <Grid container
            direction="column"
            justify="flex-start"
            alignItems="flex-start">
            <Typography style={{
              color: '#8997B1',
              maxFontWeight: 500,
              maxFontSize: '3vw',
            }}>
              {/* {user.category}*/}
            </Typography>
            <Typography className={classes.schoolName}>
              {`${user.first_name} ${user.last_name}`}
            </Typography>
          </Grid>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PhoneIcon/>
          </ListItemIcon>
          <Typography style={{
            color: '#515151',
            maxFontWeight: 500,
            maxFontSize: '18px',
            maxLineHeight: '21px',
            maxLetterSpacing: '0.1px',
            fontStyle: 'normal',
            maxWidth: '13vw',
          }}>
            {user.phone}
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <MailIcon/>
          </ListItemIcon>
          <Typography style={{
            color: '#515151',
            maxFontWeight: 500,
            maxFontSize: '18px',
            maxLineHeight: '21px',
            maxLetterSpacing: '0.1px',
            fontStyle: 'normal',
            maxWidth: '13vw',
          }}>
            {user.email}
          </Typography>
        </ListItem>
        {user.category_id === ADMIN_ID && <ListItem>
          <Typography>
            <Link href="#" onClick={() => {
              redirectToEditSchoolAdmin(user);
            }}
            style={{color: '#2196F3', fontWeight: 500, fontSize: '18px'}}>
              {intl('editProfile')}
            </Link>
          </Typography>
        </ListItem>}
      </Grid>
    </List>
  );
}
