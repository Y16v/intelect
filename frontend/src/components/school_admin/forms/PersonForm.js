import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {SUBMIT_CREATE_PERSON} from '../constanta';
import React from 'react';
import useTheme from '@material-ui/core/styles/useTheme';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {FormHelperText} from '@material-ui/core';
import {SUPER_ADMIN_ID} from '../../../reducers/user/fixture';
import CustomForm from '../../common/CustomForm';
import {intl} from '../../../routes/AppRoot';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    background: '#E5E5E5',
    padding: '20px',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  list: {
    minHeight: '110vh',
    maxHeight: '120vh',
    width: '60vw',
    background: '#FFFFFF',
    padding: '40px',
    borderRadius: '5px',
    marginBottom: '40ph',
  },
  textField: {
    '& > *': {
      width: '40vw',
      fontStyle: 'normal',
      fontWeight: '10px',
      fontSize: '20px',
      lineHeight: '24px',
      letterSpacing: '0.25px',
      color: '#515151',
    },
  },
  box: {
    marginTop: '4vh',
  },
  formControl: {
    marginTop: '5vh',
    width: '40vw',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '40vw',
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
            personName.indexOf(name) === -1 ?
                theme.typography.fontWeightRegular :
                theme.typography.fontWeightMedium,
  };
}

function TeacherSelectModal({value = '', isStudent, teachers = [], onChange}) {
  const classes = useStyles();
  const theme = useTheme();
  if (isStudent === true) {
    return (
      <div>
        {teachers.length > 0 && <FormControl className={classes.formControl}>
          <InputLabel className={classes.textField} style={{fontWeight: 'bold'}}
            id="demo-mutiple-name-label">{intl('schoolAdmin.form.personForm.teacher')}</InputLabel>
          <Select
            onChange={(e) => onChange && onChange(e.target.value)}
            input={<Input/> || ''}
            MenuProps={MenuProps}
            value={value}
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher.id} value={teacher.id}
                style={getStyles(teacher.first_name, '', theme)}>
                {`${teacher.first_name} ${teacher.last_name}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>}
      </div>
    );
  } else {
    return (<div/>);
  }
}


function GroupSelectForm({isAvailable, onChange, selectedGroupId, groups, errorMessage}) {
  const classes = useStyles();
  if (!isAvailable) {
    return <div/>;
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel className={classes.textField} style={{fontWeight: 'bold'}}>Группа</InputLabel>
      <Select
        onChange={({target}) => onChange(target.value)}
        value={selectedGroupId || 'null'}
        input={<Input/>}
        MenuProps={MenuProps}
        autoWidth
      >
        <MenuItem value="null">{intl('empty')}</MenuItem>
        {groups.map((group) => (
          <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
        ))}
      </Select>
      <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>
    </FormControl>
  );
}


function PhoneAndEmailField({isStudent, onChange, phoneError, emailError, phone, email}) {
  const classes = useStyles();
  if (isStudent === true) {
    return (
      <div/>
    );
  } else {
    return <div>
      <Box className={classes.box}>
        <TextField className={classes.textField} style={{paddingTop: '10px'}}
          id="standard-basic" label="Телефон"
          name="phone"
          InputLabelProps={{shrink: true}}
          error={!!phoneError}
          helperText={phoneError}
          onChange={onChange}
          value={phone}
        />
      </Box>
      <Box className={classes.box}>
        <TextField className={classes.textField} style={{paddingTop: '10px'}}
          id="standard-basic" label="EMail"
          name="email"
          InputLabelProps={{shrink: true}}
          error={!!emailError}
          helperText={emailError}
          onChange={onChange}
          value={email}
        />
      </Box>
    </div>;
  }
}

export default function PersonForm({
  isStudent,
  actions,
  isError,
  profile,
  selectedTeacherId,
  selectedGroupId,
  groups,
  loggedUser,
  type,
  firstNameError,
  lastNameError,
  userNameError,
  first_name,
  last_name,
  username,
  email,
  phoneError,
  emailError,
  phone,
}) {
  const classes = useStyles();
  const onChange = (event) => {
    actions.changeNameField(event.target.name, event.target.value);
  };
  console.log(phone, email, username, '5555');
  console.log((isStudent || !isStudent));

  const onSubmit = (event) => {
    if (isStudent || (!isStudent && actions.teacherFormValidate({
      phone,
      email,
      first_name,
      last_name,
      username,
    }))) actions.onSubmit();
  };

  const renderError = () => (<Typography
    component="p"
    color="error"
    align="center"
  >{intl('schoolAdmin.form.personForm.errorUser')}</Typography>);

  return (
    <CustomForm
      onSubmit={onSubmit}
    >
      <Box className={classes.box} style={{marginTop: '10vh'}}>
        <TextField className={classes.textField} style={{paddingTop: '10px'}}
          id="standard-basic" label={intl('firstname')}
          name="first_name"
          InputLabelProps={{shrink: true}}
          error={!!firstNameError}
          helperText={firstNameError}
          onChange={onChange}
          value={first_name}
        />
      </Box>
      <Box className={classes.box}>
        <TextField className={classes.textField} style={{paddingTop: '10px'}}
          id="standard-basic" label={intl('lastname')}
          name="last_name"
          InputLabelProps={{shrink: true}}
          error={!!lastNameError}
          helperText={lastNameError}
          onChange={onChange}
          value={last_name}
        />
      </Box>
      <PhoneAndEmailField
        phone={phone}
        emailError={emailError}
        phoneError={phoneError}
        email={email}
        isStudent={isStudent}
        onChange={onChange}
      />
      <Box className={classes.box}>
        <TextField className={classes.textField} style={{paddingTop: '10px'}}
          id="standard-basic" label={intl('username')}
          name="username"
          InputLabelProps={{shrink: true}}
          error={!!userNameError}
          helperText={userNameError}
          onChange={onChange}
          value={username}
        />
      </Box>
      <TeacherSelectModal
        isStudent={isStudent}
        teachers={profile.teachersWithOut}
        onChange={actions.setTeacherIdAndGetGroupsSelectOptions}
        value={selectedTeacherId}
      />
      <GroupSelectForm
        isAvailable={isStudent && loggedUser && loggedUser.category_id !== SUPER_ADMIN_ID}
        groups={groups}
        onChange={actions.onSelectGroup}
        selectedGroupId={selectedGroupId}
      />
      <Box style={{marginTop: 50}}>
        <Button variant="contained"
          type="submit"
          style={{
            color: '#FFFFFF',
            background: '#2196F3',
            marginTop: '20ph',
            fontWeight: 'bold',
          }}>
          {intl(SUBMIT_CREATE_PERSON[type])}
        </Button>
      </Box>
      {isError && renderError()}
    </CustomForm>
  );
}
