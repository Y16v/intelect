import {makeStyles} from '@material-ui/core';
import yellowButton from '../../../styles/img/button-yellow.png';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  game: {
  },
  rootBox: {
    minHeight: '96vh',
    width: '90%',
    backgroundColor: 'white',
    backgroundSize: '100% 100%',
    borderRadius: 3,
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
  },
  buttonStart: {
    backgroundImage: `url(${yellowButton})`,
    backgroundSize: '100% 100%',
    width: '30vw',
    fontSize: '7vw',
    color: '#1b1464',
    border: 'none',
    fontWeight: 'bolder',
  },
  buttonRoot: {

  },
  resultClass: {
    fontSize: '5vw',
  },
  imageResult: {
    width: '20vw',
    margin: '2vw',
  },
  buttonResult: {
    fontSize: '1.5vw',
  },
  resultHead: {
    textAlign: 'center',
  },
  buttonTask: {
    color: 'white',
    background: '#148F77',
  },
  buttonNext: {
    color: 'white',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },

});

export const colors = [
  '#3f51b5',
  '#000000',
];
