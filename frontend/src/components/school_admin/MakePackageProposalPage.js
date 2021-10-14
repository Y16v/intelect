import React from 'react';
import NavBarContainer from '../../containers/profile/NavBarContainer';
import {CardContent, Container, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import '../../styles/SchoolInfoPage.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import packageProposalStatuses from '../../constants/packageProposalStatuses';
import {intl} from '../../routes/AppRoot';


export default function({actions, school, tabNumber, packageTypeOptions, ...props}) {
  const {page, paginationCount} = props;

  React.useEffect(() => {
    actions.getLoggedUserSchool();
    actions.getPackageTypesForUpgrade();
  }, [actions, actions.getLoggedUserSchool, actions.getPackageTypesForUpgrade]);

  React.useEffect(() => {
    actions.getSchoolPackageProposalsHistory();
  }, [actions, actions.getSchoolPackageProposalsHistory, page, paginationCount]);

  return (
    <div>
      <NavBarContainer/>
      <Container className="mt3-l">
        <Card>
          <CardContent>
            <AppBar position="static">
              <Tabs value={tabNumber}
                onChange={(event, newValue) => actions.setProposalTypeTab(newValue)}>
                <Tab label={intl('schoolAdmin.renewingAPackage')} {...tabProps(0)}/>
                <Tab label={intl('schoolAdmin.changeTariff')} {...tabProps(1)}/>
                <Tab label={intl('schoolAdmin.applicationHistory')} {...tabProps(2)}/>
              </Tabs>
            </AppBar>
            <TabPanel value={tabNumber} index={0}>
              <UpdatePackageTab school={school} makeUpdatePackageProposal={actions.makeUpdatePackageProposal}/>
            </TabPanel>
            <TabPanel value={tabNumber} index={1}>
              <MakeUpgradePackageProposalTab
                packageTypeOptions={packageTypeOptions}
                school={school}
                makeUpgradePackageProposal={actions.makeUpgradePackageProposal}
              />
            </TabPanel>
            <TabPanel value={tabNumber} index={2}>
              <PackageProposalHistory {...props} {...actions}/>
            </TabPanel>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}


function tabProps(index) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`};
}


function UpdatePackageTab({school, makeUpdatePackageProposal}) {
  return (
    <Card variant="outlined">
      <CardContent>
        <table style={{border: 'none'}}>
          <tbody>
            <tr>
              <th align="left" className="pl2-l">{intl('schoolAdmin.makePackageProposalPage.remainingOfTheCurrentPackage')}</th>
              <td align="left" className="pl2-l">{school.package}</td>
            </tr>
            <tr>
              <th align="left" className="pl2-l">{intl('profile.schoolInfoPage.packagePrice')}</th>
              <td align="left" className="pl2-l">{school.package_type && school.package_type.price} {intl('profile.schoolInfoPage.som')}</td>
            </tr>
            <tr>
              <th align="left" className="pl2-l">{intl('profile.schoolInfoPage.toBeAdded')} </th>
              <td align="left" className="pl2-l">{school.package_type && school.package_type.accounts_quantity}</td>
            </tr>
            <tr>
              <th align="left" className="pl2-l">
                <Typography color="secondary">{intl('profile.schoolInfoPage.asAResult')} </Typography>
              </th>
              <td align="left" className="pl2-l">
                <Typography color="secondary">{school.package_type && school.package_type.accounts_quantity + school.package}</Typography>
              </td>
            </tr>
            <tr >
              <td className="pt3-l pl2-l">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={makeUpdatePackageProposal}
                >{intl('schoolAdmin.makePackageProposalPage.sendARequest')}</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}


function MakeUpgradePackageProposalTab({packageTypeOptions, school, makeUpgradePackageProposal}) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={3}>
          {packageTypeOptions.map((packageType) => (
            <Grid item xs={6} sm={6} md={4} lg={4} xl={4} key={packageType.id}>
              <PackageTypeCard onClick={makeUpgradePackageProposal} school={school} packageType={packageType}/>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}


function PackageProposalHistory({proposalsHistory, total, page, paginationCount, setPage, setPaginationCount, cancelPackageProposal}) {
  return (
    <Card variant="outlined">
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{intl('profile.schoolInfoPage.numberOfAccounts')}</TableCell>
                <TableCell>{intl('profile.superAdmin.packageProposalsPage.duration')}</TableCell>
                <TableCell>{intl('profile.superAdmin.packageProposalsPage.price')} </TableCell>
                <TableCell>{intl('schoolAdmin.makePackageProposalPage.departureDate')}</TableCell>
                <TableCell>{intl('schoolAdmin.makePackageProposalPage.status')}</TableCell>
                <TableCell>{intl('cancel')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {proposalsHistory.map((proposal) => (
                <TableRow key={proposal.id}>
                  <TableCell>{proposal.package_type.accounts_quantity}</TableCell>
                  <TableCell>{proposal.package_type.item_month_duration} {intl('profile.schoolInfoPage.months')}</TableCell>
                  <TableCell>{proposal.package_type.price} {intl('profile.schoolInfoPage.som')}</TableCell>
                  <TableCell>{proposal.created_at}</TableCell>
                  <TableCell>{intl(proposal.statusDisplayName)}</TableCell>
                  <TableCell>
                    <Button color="secondary"
                      disabled={proposal.status !== packageProposalStatuses._codes._pending}
                      onClick={() => cancelPackageProposal(proposal.id)}
                    >
                      {intl('cancel')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={total}
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


function PackageTypeCard({packageType, school, onClick}) {
  return (
    <Card>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>{intl( 'profile.schoolInfoPage.numberOfAccounts')}</Grid>
          <Grid item>{packageType.accounts_quantity}</Grid>
        </Grid>
        <Grid container justify="space-between">
          <Grid item>{intl('profile.superAdmin.packageProposalsPage.duration')} </Grid>
          <Grid item>{packageType.item_month_duration} {intl('profile.schoolInfoPage.months')}</Grid>
        </Grid>
        <Grid container justify="space-between">
          <Grid item><Typography color="secondary">{intl('profile.superAdmin.packageProposalsPage.price')}:</Typography></Grid>
          <Grid item><Typography color="secondary">{packageType.price} {intl('profile.schoolInfoPage.som')} </Typography></Grid>
        </Grid>
        <Box>
          <Grid container className="mt2-l">
            <Grid item>
              <Button
                size="small"
                color="primary"
                variant="contained"
                disabled={school.package_type_id === packageType.id}
                onClick={() => onClick(packageType.id)}
              >{intl('schoolAdmin.makePackageProposalPage.sendARequest')}</Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
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
