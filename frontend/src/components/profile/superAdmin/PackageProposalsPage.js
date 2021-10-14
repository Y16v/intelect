import React from 'react';
import NavBarContainer from '../../../containers/profile/NavBarContainer';
import {
  CardContent,
  Container,
  Menu,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import packageProposalStatuses from '../../../constants/packageProposalStatuses';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import '../../../styles/packageProposalsPage.css';
import {intl} from '../../../routes/AppRoot';


export default function({
  actions,
  schoolIdForFilter,
  statusForFilter,
  schools,
  ...props
}) {
  React.useEffect(() => {
    actions.getSchools();
  }, [actions, actions.getSchools]);

  React.useEffect(() => {
    actions.getPackageProposals();
  }, [
    actions,
    actions.getPackageProposals,
    schoolIdForFilter,
    statusForFilter,
    props.paginationCount,
    props.page,
  ]);
  return (
    <div className="package-proposals-page">
      <NavBarContainer/>
      <Container className="mt3-l">
        <Card>
          <CardContent>
            <Grid container alignItems="center" spacing={3}>
              <Grid item>
                <Typography variant="h5">{intl('profile.superAdmin.packageProposalsPage.packageRequests')}</Typography>
              </Grid>
              <Grid item>
                <FormControl>
                  <Select
                    value={schoolIdForFilter}
                    onChange={(event) => actions.setSchoolIdForFilter(event.target.value)}
                  >
                    <MenuItem value="__all__">{intl('profile.superAdmin.packageProposalsPage.allSchools')}</MenuItem>
                    {schools.map((group) => (
                      <MenuItem value={group.id} key={group.id}>{group.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <AppBar position="static" className="mt2-l">
              <Tabs value={statusForFilter - 1} onChange={(event, newValue) => actions.setStatusForFilter(newValue + 1)}>
                <Tab label={intl('profile.superAdmin.packageProposalsPage.pending')} wrapped {...a11yProps(0)} />
                <Tab label={intl('profile.superAdmin.packageProposalsPage.canceled')} wrapped {...a11yProps(1)} />
                <Tab label={intl('profile.superAdmin.packageProposalsPage.rejected')} wrapped {...a11yProps(2)} />
                <Tab label={intl('profile.superAdmin.packageProposalsPage.adopted')} wrapped {...a11yProps(3)} />
              </Tabs>
            </AppBar>
            <TabPanel value={statusForFilter - 1} index={statusForFilter - 1}>
              <PackageProposalsTable
                {...props}
                statusForFilter={statusForFilter}
                {...actions}/>
            </TabPanel>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}


function PackageProposalsTable({
  proposals,
  totalProposals,
  page,
  statusForFilter,
  paginationCount,
  setPage,
  setPaginationCount,
  actionMenuAttrs,
  showProposalActionsMenu,
  closeProposalActionsMenu,
  rejectProposal,
  confirmProposal,
}) {
  return (
    <Card variant="outlined" className="mt2-l">
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{intl('profile.superAdmin.packageProposalsPage.school')}</TableCell>
                <TableCell>{intl('profile.superAdmin.packageProposalsPage.qty.accounts')}</TableCell>
                <TableCell>{intl('profile.superAdmin.packageProposalsPage.duration')}</TableCell>
                <TableCell>{intl('profile.superAdmin.packageProposalsPage.price')} </TableCell>
                <TableCell>{intl('profile.superAdmin.packageProposalsPage.created')}</TableCell>
                {statusForFilter === packageProposalStatuses._codes._confirmed && (
                  <TableCell>{intl('profile.superAdmin.packageProposalsPage.accepted')}</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {proposals.map((proposal) => (
                <TableRow key={proposal.id}
                  hover
                  onClick={({currentTarget}) => showProposalActionsMenu(
                      proposal.id,
                      currentTarget,
                      proposal.status === packageProposalStatuses._codes._pending,
                  )}
                >
                  <TableCell>{proposal.school.name}</TableCell>
                  <TableCell>{proposal.package_type.accounts_quantity}</TableCell>
                  <TableCell>{proposal.package_type.item_month_duration} месяцев</TableCell>
                  <TableCell>{proposal.package_type.price} сом</TableCell>
                  <TableCell>{proposal.created_at}</TableCell>
                  {statusForFilter === packageProposalStatuses._codes._confirmed && (
                    <TableCell>{proposal.confirmed_at}</TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
            <ActionsMenu {...actionMenuAttrs}
              closeProposalActionsMenu={closeProposalActionsMenu}
              rejectProposal={rejectProposal}
              confirmProposal={confirmProposal}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={totalProposals || 0}
          rowsPerPage={paginationCount}
          page={page - 1}
          onChangePage={(event, newValue) => setPage(newValue + 1)}
          onChangeRowsPerPage={
            ({target}) =>
              setPaginationCount(parseInt(target.value))
          }
        />
      </CardContent>
    </Card>
  );
}


function ActionsMenu({
  proposalId,
  canUpdateStatus,
  anchorEl,
  closeProposalActionsMenu,
  rejectProposal,
  confirmProposal,
}) {
  return (
    <Menu
      keepMounted
      open={!!proposalId}
      anchorEl={anchorEl}
      onClose={closeProposalActionsMenu}
    >
      <MenuItem
        disabled={!canUpdateStatus}
      >
        <Typography color={canUpdateStatus ? 'secondary' : 'initial'}
          onClick={() => rejectProposal(proposalId)}
        >{intl('profile.superAdmin.packageProposalsPage.deny')}</Typography>
      </MenuItem>
      <MenuItem
        disabled={!canUpdateStatus}
      >
        <Typography color={canUpdateStatus ? 'primary' : 'initial'}
          onClick={() => confirmProposal(proposalId)}
        >{intl('profile.superAdmin.packageProposalsPage.toAccept')}</Typography>
      </MenuItem>
    </Menu>
  );
}


function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}


function a11yProps(index) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
