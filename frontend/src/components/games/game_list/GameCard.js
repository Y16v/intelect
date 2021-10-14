import React from 'react';
import Card from '@material-ui/core/Card';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert';
import YellowButtonFon from '../../../styles/img/button-yellow.png';
import GameTitleBackgroundImage from '../../../styles/img/games-title.png';
import Button from '@material-ui/core/Button';
import {intl} from '../../../routes/AppRoot';

const useStyles = makeStyles({
  button: {
    background: `url(${YellowButtonFon}) center center no-repeat`,
    backgroundSize: 'contain',
    width: '120px',
    color: '#1b1464',
    fontWeight: 700,
    marginBottom: '5px',
  },
  gameTitle: {
    background: `url(${GameTitleBackgroundImage}) center`,
    backgroundSize: 'cover',
    width: '140px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeft: '25%',
    borderRight: '25%',
    color: '#1b1464',
    textTransform: 'uppercase',
    marginTop: '5px',
  },
  card: {
    width: '200px',
    boxShadow: '0 1px 4px 0 rgba(0,0,0,.14)',
    textAlign: 'center',
    color: 'white',
  },
  title: {
    fontSize: 14,
  },
  iconCard: {
    width: 90,
    height: 90,
    marginTop: '18%',
    marginBottom: '18%',
    backgroundSize: 'contain',
  },

  MuiCardActionArea: {
    height: '100%',
  },
});

export default function GameCard({game, actions}) {
  const classes = useStyles();

  function openAlert() {
    swal({
      title: intl('Игра на стадии разработки!'),
      text: '  ',
      icon: 'warning',
      inline: 'center',
      buttons: false,
    });
  }
  return (
    <Card className={classes.card} style={{background: 'rgba(52, 152, 219, 0.6)'}}>
      <Grid container
        direction="column"
        justify="center"
        alignItems="center">
        <div className={classes.gameTitle}>
          <b>{intl(game.name) || 'UNKNOWN'}</b>
        </div>
        <CardMedia
          className={classes.iconCard}
          image= {game.icon}
          title={game.name}
        />
        <div className={classes.openGameButton}>
          <Button className={classes.button} onClick={(e) => game.disabled ? openAlert() :actions.onClickGame(game.url)}>{intl('playGame')}</Button>
        </div>
      </Grid>
    </Card>
  );
}
