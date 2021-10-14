import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {CheckCircle, HighlightOff} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import {history} from '../../../index';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import {Box, Menu, TableContainer, TextField} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import CustomLink from '../../common/CustomLink';
import Grid from '@material-ui/core/Grid';
import TablePagination from '@material-ui/core/TablePagination';
import {intl} from '../../../routes/AppRoot';

const useStyles = makeStyles({
  drawerPaper: {
    height: 420,
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  table: {
    minWidth: 650,
    marginTop: '12px',
  },
  spinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 0',
  },
  tableCell: {
    fontWeight: '700',
  },
  contentHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});


export default (props) => {
  const classes = useStyles();
  const {actionMenuAttrs, actions, loading, q, page, paginationCount} = props;

  React.useEffect(() => {
    actions.searchSchools();
  }, [
    actions,
    q,
    page,
    paginationCount,
  ]);

  return (
    <Card className={classes.root}>
      {SchoolActionsMenu(actions.closeSchoolActionsMenu, actionMenuAttrs)}
      <CardContent>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <Typography variant="h5" component="h2">{intl('profile.card.mySchools.mySchools')}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <TextField fullWidth
              value={props.q}
              helperText={intl('profile.card.mySchools.searchByName')}
              onChange={({target}) =>
                props.actions.setSearchQueryValue(target.value)
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <Button
              size='small'
              variant="contained"
              color="primary"
              onClick={() => history.push('/my_schools/create')}
              startIcon={<AddIcon />}
            >
              {intl('profile.card.mySchools.create')}
            </Button>
          </Grid>
        </Grid>
        <TableContainer>
          {loading ?
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.tableCell} >{intl('profile.card.mySchools.name')}</TableCell>
                          <TableCell className={classes.tableCell} align="left">{intl('profile.card.mySchools.dateOfCreation')}</TableCell>
                          <TableCell className={classes.tableCell} align="left">{intl('profile.card.mySchools.remainingPackage')}</TableCell>
                          <TableCell className={classes.tableCell} align="left">{intl('profile.card.mySchools.activate')}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.searchResult.schools.map((school) => (
                          <TableRow
                            hover
                            key={school.id}
                            onClick={
                              (event) =>
                                actions.showSchoolActionsMenu({
                                  schoolId: school.id,
                                  adminId: school.owner_id,
                                  anchorEl: event.currentTarget,
                                })
                            }
                          >
                            <TableCell align="left">{school.name}</TableCell>
                            <TableCell
                              align="left">{school.created_at}</TableCell>
                            <TableCell align="left">{school.package}</TableCell>
                            <TableCell align="left">{school.is_active ? <CheckCircle color='primary'/> :
                                        <HighlightOff color='secondary'/>}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table> :
                        <div className={classes.spinner}>
                          <CircularProgress color="secondary" size={70}/>
                        </div>
          }
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.searchResult.total}
          rowsPerPage={props.paginationCount}
          page={props.page - 1}
          onChangePage={(event, newValue) => props.actions.setPage(newValue + 1)}
          onChangeRowsPerPage={
            ({target}) =>
              props.actions.setPaginationCount(parseInt(target.value))
          }
        />
      </CardContent>
    </Card>
  );
};


function SchoolActionsMenu(onClose, actionMenuAttrs) {
  return (
    <Menu
      open={!!actionMenuAttrs.schoolId}
      keepMounted
      anchorEl={actionMenuAttrs.anchorEl}
      onClose={onClose}
    >
      <MenuItem>
        <CustomLink
          to={`/my_schools/${actionMenuAttrs.schoolId}`}
          onClick={onClose}
          tag={Box}
          width="100%"
        >{intl('profile.card.mySchools.moreDetails')}</CustomLink>
      </MenuItem>
      <MenuItem>
        <CustomLink
          to={`/my_schools/${actionMenuAttrs.schoolId}/update`}
          onClick={onClose}
          tag={Box}
          width="100%"
        >{intl('profile.card.mySchools.update')}</CustomLink>
      </MenuItem>
      <MenuItem>
        <CustomLink
          to={`/change-child-password/${actionMenuAttrs.adminId}`}
          onClick={onClose}
          tag={Box}
          width="100%"
        >{intl('profile.card.mySchools.changePasswordAdmin')}</CustomLink>
      </MenuItem>
    </Menu>
  );
}
