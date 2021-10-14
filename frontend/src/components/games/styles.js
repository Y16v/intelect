import {makeStyles} from '@material-ui/core/styles';
import buttonImage from '../../styles/img/button-yellow.png';

export const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  saveButton: {
    position: 'relative',
    minWidth: '8vw',
    minHeight: '4vh',
    fontWeight: 'bold',
    borderRadius: '50vw',
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomButton: {
    textAlign: 'center',
    color: '#1b1464',
    width: '100%',
    fontWeight: 'bold',
    backgroundImage: `url(${buttonImage})`,
    backgroundSize: '100% 100%',
  },
  titleForm: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: 'white',
    textDecoration: 'none',
  },
  paper: {
    padding: theme.spacing(0.2),
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formContainer: {
    minHeight: '18vh',
    maxWidth: '90vw',
    backgroundColor: ' rgba(128, 165, 220, 0.5) ',
    margin: theme.spacing(1.2),
    marginTop: theme.spacing(3),
  },
  minFormContainer: {
    height: '4.5vh',
    minWidth: '20vw',
    backgroundColor: '#ff9b00',
  },
  centerForm: {
    margin: 'auto',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
  },
  muiTypography: {
    color: 'white',
    fontWeight: 'bold',
    userSelect: 'none',
    fontSize: '36px',
  },
  titleTypography: {
    color: 'white',
    fontWeight: 600,
    userSelect: 'none',
    fontSize: '3vh',
    overflow: 'hidden',
    height: '5vh',
  },
  resultContainer: {

  },
  resultTextContainer: {
    width: '95%',
    overflow: 'hidden',
    padding: '10px',
  },
  resultPercentContainer: {
    minHeight: '10vh',
    width: '30vw',
    overflow: 'hidden',
  },
  tableText: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
  },
  resultProgress: {
    maxHeight: '3vw',
    minHeight: '1vw',
    borderRadius: '5vw',
    alignItems: 'center',
    margin: 'auto',
  },
  resultProgressTypography: {
    marginTop: '3vh',
    textAlign: 'center',
    color: 'white',
    fontWeight: 600,
    userSelect: 'none',
    fontSize: '8vh',
    overflow: 'hidden',
  },
  resultMinContainer: {
    background: 'rgba(103,142,255,0.44)',
    borderRadius: 100,
    marginTop: '5px',
    padding: '5px',
  },
}));
