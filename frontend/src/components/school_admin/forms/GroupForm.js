import React from 'react';
import Grid from '@material-ui/core/Grid';
import {TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CustomLink from '../../common/CustomLink';
import {intl} from '../../../routes/AppRoot';


export default function({id, name, changeFieldValue, onSubmit, nameError}) {
  const onFieldChange = (e) => {
    changeFieldValue({
      fieldName: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item>
        <TextField fullWidth
          label={intl('schoolAdmin.form.groupForm.nameGroup')}
          error={!!nameError}
          helperText={nameError}
          value={name}
          name="name"
          InputLabelProps={{shrink: true}}
          onChange={onFieldChange}
        />
      </Grid>
      <Grid container alignItems="center" spacing={4} item>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={onSubmit}
          >{intl('schoolAdmin.form.groupForm.save')}</Button>
        </Grid>
        <Grid item>
          <CustomLink
            to="/school-admin-page"
            tag={Button}
            color="secondary"
            size="small"
          >{intl('cancel')}</CustomLink>
        </Grid>
      </Grid>
    </Grid>
  );
}
