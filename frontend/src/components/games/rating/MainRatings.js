import React from 'react';
import './main-rating.css';
import Grid from '@material-ui/core/Grid';
import StudentsListTable from './StudentsListTable';
import {Container} from '@material-ui/core';
import SideBar from '../../../containers/navbar/SideBarContainer';
import {makeStyles} from '@material-ui/core/styles';
import {Search} from '@material-ui/icons';
import Input from '@material-ui/core/Input';
import {intl} from '../../../routes/AppRoot';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    paddingTop: theme.spacing(12),
    color: 'white',
  },
  mainCardHeader: {
    width: '100%',
    height: '60px',
    backgroundColor: '#F1C40F',
    fontSize: '20px',
    fontWeight: '600',
    color: 'white',
    padding: '0 12px 0 0',
  },
  searchFormContainer: {
    float: 'right',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: theme.spacing(1),
    fontSize: '28px',
  },
  searchInput: {
    'color': 'white',
    'fontSize': '16px',
    '&::before': {
      borderColor: 'white',
    },
  },
  ratingTypeButton: {
    height: '60px',
    cursor: 'pointer',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingTypeButtonActive: {
    height: '60px',
    cursor: 'pointer',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7f8c8d',
  },
}));


export default function MainRatings(props) {
  const classes = useStyles();
  const {searchStudents, profile, actions} = props;

  React.useEffect(() => {
    actions.setPaginationCount(30);
    actions.getCurrentUser();
  }, [actions]);

  React.useEffect(() => {
    actions.searchStudents();
  }, [actions, searchStudents.page, searchStudents.selectedSchoolId, searchStudents.searchValue]);
  return (
    <div className="main-rating-background-img">
      <SideBar/>
      <Container className={classes.mainContainer}>
        <div className="main-card">
          <div>
            <Grid item>
              <CardHeader
                schoolId={profile.school_id}
                actions={actions}
                searchStudents={searchStudents}
              />
            </Grid>
            <Grid item>
              <StudentsListTable {...props}/>
            </Grid>
          </div>
        </div>
      </Container>
    </div>
  );
}


function CardHeader({actions, schoolId, searchStudents}) {
  const classes = useStyles();
  return (
    <Grid container
      item
      className={classes.mainCardHeader}
      alignItems="center"
      justify="space-between"
    >
      <Grid item container sm={12} md={6}>
        <Grid item
          xs={6}
          className={searchStudents.selectedSchoolId === '__all__' ?
                      classes.ratingTypeButtonActive : classes.ratingTypeButton}
          onClick={({target}) => actions.setSchoolId('__all__')}
        >
          {intl('game.modal.rating.mainRatings.globalRating')}
        </Grid>
        {
          schoolId && (
            <Grid item
              xs={6}
              className={searchStudents.selectedSchoolId === String(schoolId) ?
                                  classes.ratingTypeButtonActive : classes.ratingTypeButton}
              onClick={({target}) => actions.setSchoolId(String(schoolId))}
            >
              {intl('game.modal.rating.mainRatings.schoolRating')}
            </Grid>
          )
        }
      </Grid>
      <Grid item sm={12} md={6}>
        <div className={classes.searchFormContainer}>
          <Search className={classes.searchIcon}/>
          <Input className={classes.searchInput}
            onChange={(event) => actions.setSearchValue(event.target.value)}
          />
        </div>
      </Grid>
    </Grid>
  );
}
