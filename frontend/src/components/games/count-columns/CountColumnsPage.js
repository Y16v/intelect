import React from 'react';
import ColumnGame from './ColumnGame';
import Grid from '@material-ui/core/Grid';
import SettingsGameCountColumnModal from '../../../containers/games/modals/GameCountColumnsModal';


export default function CountColumnsPage(props) {
  return (
    <div className="settings-modal-root">
      <Grid container direction="row" justify="center">
        <div className="column-game-block">
          <Grid item xs={12} >
            <ColumnGame
              {...props}/>
          </Grid>
        </div>
        <SettingsGameCountColumnModal/>
      </Grid>
    </div>);
}
