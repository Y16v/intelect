import React from 'react';
import '../../../styles/setting-operation.css';
import operations from '../../../interactors/operations';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import {intl} from '../../../routes/AppRoot';

export default function CardChooseExpression({onSelect}) {
  return (
    <div className="container-card">
      <h2 className="text-typography">
        {intl('chooseAnExpression')}
      </h2>
      <Grid container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {operations.map((operations) => (
          <div className="card-row" key={operations.id}>
            <div className="card-header">{intl(operations.name)}</div>
            <CardMedia
              key={operations.id}
              className="icon-card"
              image={operations.icon}
              onClick={() => onSelect&&onSelect(operations.value)}
            />
          </div>
        ))}
      </Grid>
    </div>
  );
}
