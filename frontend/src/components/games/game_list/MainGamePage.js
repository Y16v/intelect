import React from 'react';
import GameCard from './GameCard';
import Box from '@material-ui/core/Box/Box';
import {Container, makeStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import SideBar from '../../../containers/navbar/SideBarContainer';
import {isMobile} from 'react-device-detect';
import LinkMobileApp from '../../../containers/LinkMobileApp/LinkMobileAppContainer';


const useStyles = makeStyles({
  secondBox: {
    paddingTop: 100,
  },
});

export default function MainGamePage({games, actions}) {
  const classes = useStyles();
  return (
    <Box className="main-game-page-root">
      <SideBar/>
      <Grid container justify="center">
        <Grid item>
          <Container className={classes.secondBox} maxWidth="md">
            { isMobile ? <LinkMobileApp /> : <div/>}
            <Grid container spacing={6} justify="center">
              {games.map((game) => (
                <Grid key={game.id} item xs={12} xl={4} lg={4} sm={6} style={{display: 'flex', justifyContent: 'center'}}>
                  <GameCard key={game.id} game={game} actions={actions} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}
