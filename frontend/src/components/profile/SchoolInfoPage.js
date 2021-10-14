import React from 'react';
import Grid from '@material-ui/core/Grid';
import NavBarContainer from '../../containers/profile/NavBarContainer';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {AddCircle, Edit} from '@material-ui/icons';
import TableCell from '@material-ui/core/TableCell';
import {Card, DialogContent, DialogTitle, Table, TableBody} from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import CardContent from '@material-ui/core/CardContent';
import '../../styles/SchoolInfoPage.css';
import {history} from '../../index';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import 'react-redux-notify/dist/ReactReduxNotify.css';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import {intl} from '../../routes/AppRoot';


export default ({
  match,
  actions,
  school,
  schoolAdmin,
  teachers,
  students,
  updatedPackage,
  isConfirmUpdatePackage,
  updatePackageConfirmPassword,
  packageTypesForUpgradeTariff,
  updatePackageTypeConfirmPassword,
  isConfirmUpdatePackageType,
  updateSchoolPackageError,
  updatePackageTypeError,
}) => {
  const [tabNumber, setTabNumber] = React.useState(0);
  const schoolId = match.params.schoolId;

  const updateSchoolPackage = () => {
    actions.updatePackage();
  };

  const onChoosePackageType = (packageType) => {
    actions.setPackageTypeForUpgradeTariff(packageType);
    actions.openUpdatePackageTypeConfirmDialog();
  };

  React.useEffect(() => {
    actions.getPackageTypesForSchools();
    actions.retrieveSchool(schoolId);
    actions.getSchoolTeachers(schoolId);
    actions.getSchoolStudents(schoolId);
    actions.getPackageTypesForSchools();
  }, [actions, updatedPackage, schoolId]);

  React.useEffect(() => {
    school.owner_id && actions.getSchoolAdmin(school.owner_id);
  }, [actions, school.owner_id]);

  return (
    <div>
      <NavBarContainer/>
      <Container className="main-container">
        <Card>
          <CardContent>
            <div className="sections">
              <section className="school-info-section">
                <Typography gutterBottom variant="h4" component="h4">
                  {school.name}
                </Typography>
                <Grid container>
                  <Grid item container alignItems="center">
                    <Grid item>
                      <Typography variant="h6">{intl('profile.schoolInfoPage.allInfo')}</Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        size="medium"
                        name={intl('profile.schoolInfoPage.edit')}
                        onClick={() => history.push(`/my_schools/${schoolId}/update`)}
                      >
                        <Edit/>
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Table size="small" className="info-table">
                    <TableBody>
                      <TableRow>
                        <TableCell variant="head" className="info-label">{intl('profile.schoolInfoPage.name')}</TableCell>
                        <TableCell>{school.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head" className="info-label">{intl('profile.schoolInfoPage.fullNameDirector')}</TableCell>
                        <TableCell>{`${schoolAdmin.first_name} ${schoolAdmin.last_name}`}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head" className="info-label">{intl('profile.schoolInfoPage.phone')}</TableCell>
                        <TableCell>{schoolAdmin.phone}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head" className="info-label">Email: </TableCell>
                        <TableCell>{schoolAdmin.email}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </section>
              <section className="school-academics-info">
                <AppBar position="static">
                  <Tabs value={0} aria-label="simple tabs example">
                    <Tab label={intl('profile.schoolInfoPage.teacherAndStudent')} wrapped {...a11yProps(0)} />
                  </Tabs>
                </AppBar>
                <TabPanel value={0} index={0}>
                  <Table size="small" className="info-table">
                    <TableBody>
                      <TableRow>
                        <TableCell variant="head" className="info-label">{intl('profile.schoolInfoPage.numberOfTeacher')}</TableCell>
                        <TableCell>{teachers.length}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head" className="info-label">{intl('profile.schoolInfoPage.numberOfStudent')}</TableCell>
                        <TableCell>{students.length}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabPanel>
              </section>
              <section className="school-admin-info">
                <AppBar position="static">
                  <Tabs value={0} aria-label="simple tabs example">
                    <Tab label={intl('profile.schoolInfoPage.access')} wrapped {...a11yProps(0)} />
                    <Tab label={<Edit/>} onClick={() => history.push(`/change-child-password/${schoolAdmin.id}`)}/>
                  </Tabs>
                </AppBar>
                <TabPanel value={0} index={0}>
                  <Table size="small" className="info-table">
                    <TableBody>
                      <TableRow>
                        <TableCell variant="head" className="info-label">{intl('profile.schoolInfoPage.username')}</TableCell>
                        <TableCell>{schoolAdmin.username}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head" className="info-label">{intl('profile.schoolInfoPage.password')}</TableCell>
                        <TableCell>{schoolAdmin.student_password}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabPanel>
              </section>
              <section className="school-package-info">
                <AppBar position="static">
                  <Tabs value={tabNumber} onChange={(event, newValue) => setTabNumber(newValue)} aria-label="simple tabs example">
                    <Tab label={intl('profile.schoolInfoPage.currentPocket')} wrapped {...a11yProps(0)} />
                    <Tab label={<AddCircle/>} {...a11yProps(1)} />
                    <Tab label={<Edit/>} {...a11yProps(2)} />
                  </Tabs>
                </AppBar>
                {/* First tab. Main info*/}
                <TabPanel value={tabNumber} index={0}>
                  <Table size="small" className="info-table">
                    <TableBody>
                      <TableRow>
                        <TableCell variant="head" className="info-label">{intl('profile.schoolInfoPage.packagePrice')} </TableCell>
                        <TableCell>{school.package_type && school.package_type.price}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head" className="info-label">{intl('profile.schoolInfoPage.numberOfAccount')} </TableCell>
                        <TableCell>{school.package_type && school.package_type.accounts_quantity}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head" className="info-label">{intl('profile.schoolInfoPage.packageDuration')}</TableCell>
                        <TableCell>{school.package_type && school.package_type.item_month_duration} {intl('profile.schoolInfoPage.months')}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell variant="head" className="info-label"><Box fontWeight="fontWeightMedium">{intl('profile.schoolInfoPage.remainingPackages')}</Box></TableCell>
                        <TableCell><Box fontWeight="fontWeightMedium">{school.package}</Box></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabPanel>
                {/* Second tab: Update package*/}
                <TabPanel value={tabNumber} index={1}>
                  {ConfirmActionDialog({
                    isOpen: isConfirmUpdatePackage,
                    onSubmit: updateSchoolPackage,
                    onInputChange: (event) => actions.setUpdatePackageConfirmPassword(event.target.value),
                    onClose: actions.closeUpdatePackageConfirmDialog,
                    passwordValue: updatePackageConfirmPassword,
                    title: intl('profile.schoolInfoPage.enterAPasswordToConfirm'),
                    errorMessage: updateSchoolPackageError,
                  })}
                  <Card>
                    <CardContent>
                      <Table size="small" className="info-table">
                        <TableBody>
                          <TableRow>
                            <TableCell variant="head" className="info-label">{intl('profile.schoolInfoPage.packagePrice')}</TableCell>
                            <TableCell>{school.package_type && school.package_type.price}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell variant="head" className="info-label">{intl('profile.schoolInfoPage.toBeAdded')}</TableCell>
                            <TableCell>{school.package_type && school.package_type.accounts_quantity}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell variant="head" className="info-label">
                              <Typography color="secondary">{intl('profile.schoolInfoPage.asAResult')}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography color="secondary">{school.package_type && school.package_type.accounts_quantity + school.package}</Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={actions.openUpdatePackageConfirmDialog}
                      >{intl('profile.schoolInfoPage.addPackage')}</Button>
                    </CardContent>
                  </Card>
                </TabPanel>
                {/* Third tab: edit package type*/}
                <TabPanel value={tabNumber} index={2}>
                  {ConfirmActionDialog({
                    isOpen: isConfirmUpdatePackageType,
                    onSubmit: actions.updatePackageType,
                    onInputChange: (event) => actions.setUpdatePackageTypeConfirmPassword(event.target.value),
                    onClose: actions.closeUpdatePackageTypeConfirmDialog,
                    passwordValue: updatePackageTypeConfirmPassword,
                    title: intl('profile.schoolInfoPage.enterAPasswordToConfirm'),
                    errorMessage: updatePackageTypeError,
                  })}
                  {
                                            !school.package ?
                                                <Typography variant="h6">{intl('profile.schoolInfoPage.chooseANewTariffPlan')}</Typography> :
                                                <Typography color="error">{intl('profile.schoolInfoPage.changeTariff')}</Typography>
                  }
                  <Grid container spacing={2}>
                    {!school.package && packageTypesForUpgradeTariff.map((packageType) => (
                      <Grid item xs={6} md={6} lg={6} key={packageType.id}>
                        {PackageTypeCard({
                          packageType: packageType,
                          onClick: () => onChoosePackageType(packageType),
                        })}
                      </Grid>
                    ))}
                  </Grid>

                </TabPanel>
              </section>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

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

function PackageTypeCard({packageType, onClick}) {
  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item container justify="space-between">
            <Grid item>{intl('profile.schoolInfoPage.numberOfAccounts')}</Grid>
            <Grid item>{packageType.accounts_quantity}</Grid>
          </Grid>
          <Grid item container justify="space-between">
            <Grid item>Длительность: </Grid>
            <Grid item>{packageType.item_month_duration} {intl('profile.schoolInfoPage.months')}</Grid>
          </Grid>
          <Grid item container justify="space-between">
            <Grid item><Box fontWeight="fontWeightMedium">{intl('profile.schoolInfoPage.totalPrice')}</Box></Grid>
            <Grid item><Box fontWeight="fontWeightMedium">{packageType.price} {intl('profile.schoolInfoPage.som')} </Box></Grid>
          </Grid>
          <Grid item container style={{marginTop: '5px'}}>
            <Grid item>
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={onClick}
              >{intl('profile.schoolInfoPage.update')}</Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function ConfirmActionDialog({
  isOpen,
  onSubmit,
  onClose,
  onInputChange,
  passwordValue,
  title,
  errorMessage,
}) {
  return (
    <Dialog open={isOpen} aria-labelledby="simple-dialog-title">
      <DialogTitle id="simple-dialog-title">{ title }</DialogTitle>
      <DialogContent>
        <TextField
          id="outlined-basic"
          label={intl('profile.schoolInfoPage.enterPassword')}
          InputLabelProps={{shrink: true}}
          value={passwordValue}
          onChange={onInputChange}
          type="password"
        />
        <Typography color="error">{ errorMessage }</Typography>
        <Button
          color="primary"
          form="password-confirm"
          disabled={!passwordValue}
          onClick={onSubmit}
        >
          {intl('profile.schoolInfoPage.confirm')}
        </Button>
        <Button color="secondary" onClick={onClose}>{intl('cancel')}</Button>
      </DialogContent>
    </Dialog>
  );
}

function a11yProps(index) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
