import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    maxWidth: '30em',
  },
  keys: {
    maxWidth: '16em',
    padding: theme.spacing(1),
  },
  input: {
    marginBottom: 5,
    maxWidth: '100%',
    padding: 1,
    backgroundColor: '#D5DBDB',
  },
  inputPropsTextField: {
    fontSize: '5vw',
    textAlign: 'center',
    color: '#1b1464',
    fontWeight: 'bolder',
    backgroundColor: 'white',
  },
  paper: {
    'padding': theme.spacing(1),
    'width': '10',
    'textAlign': 'center',
    'fontSize': '0.8rem',
    '@media (min-height:400px)': {
      fontSize: '1rem',
    },
    '@media (min-height:600px)': {
      fontSize: '1.5rem',
    },
    'backgroundColor': 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',

  },
  buttonRoot: {
    background: '#ff9b00',
    borderRadius: 3,
    border: 0,
    height: '6vh',
    minHeight: '2.5em',
    color: 'white',
    fontWeight: 'bolder',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
}));
