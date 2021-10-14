import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import '../../../styles/colus.css';
import backgroundImg from '../../../styles/img/wallpaper-art-image.jpg';
import {intl} from '../../../routes/AppRoot';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    backgroundImage: `url(${backgroundImg})`,
    backgroundAttachment: 'fixed',
    backgroundSize: '100% 100%',
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  paper: {
    'display': 'flex',
    'flexWrap': 'wrap',
    '& > *': {
      marginLeft: '10px',
      marginRight: '10px',
      marginBottom: '10px',
      width: '100%',
      height: '85vh',
      borderRadius: '0',
    },
  },
  list: {
    position: 'relative',
    overflow: 'auto',
    maxHeight: '90vh',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ResultModal({allResults, results, open, isSubmitLoading, actions}) {
  const classes = useStyles();
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const {current: descriptionElement} = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog fullScreen open={open}
        TransitionComponent={Transition}
        onClose={actions.close}
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
        disableAutoFocus={true}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start" color="inherit"
              aria-label="close"
              onClick={actions.close}
            >
              <CloseIcon/>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {''}
            </Typography>
            <Button disabled={isSubmitLoading} color="inherit"
              onClick={() => actions.onSubmitResult(allResults)}>
              {intl('toComplete')}
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <Grid container
            direction="row"
            justify="center"
            alignItems="center" className={classes.paper}>
            <List className={classes.list} style={{width: '100%'}}>
              <ListItem style={{width: '100%', height: '100%'}}>
                <Grid container
                  direction="column"
                  justify="flex-start"
                  alignItems="center">
                  {(results || [])
                      .map(
                          (resultItem) =>
                            <Typography className={classes.textArea}
                              rowsMax={2}
                              color="primary"
                              fontWeight="fontWeightMedium"
                              m={1}
                              key={resultItem}
                              style={{
                                fontSize: '3vw',
                                color: 'white',
                                margin: '1rem',
                                fontWeight: 'bold',
                              }}>
                              {resultItem}
                            </Typography>,
                      )
                  }
                </Grid>
              </ListItem>
            </List>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}
