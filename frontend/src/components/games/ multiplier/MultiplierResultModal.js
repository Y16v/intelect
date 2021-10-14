import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import '../../../styles/fullScreenDialog.css';
import Grid from '@material-ui/core/Grid';
import {Container} from '@material-ui/core';
import {CBRT, CUBE, DIVIDE, MULTIPLY, QUIRE, SQRT} from '../../../interactors/multiplier/multiplier';
import {Link} from 'react-router-dom';
import {intl} from '../../../routes/AppRoot';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MultiplierAllResultModal({
  isError, currentAnswer, actionType, digitOne,
  digitTwo, isOpenAllResultModal, closeAllResultModal,
  expect,
}) {
  const TWO_OPERAND = [MULTIPLY, DIVIDE];
  const getSize = (number) => {
    const length = `${number}`.length;
    if (length <= 19) return '5vw';
    if (length <= 20) return '4.7vw';
    if (length <= 21) return '4.5vw';
    if (length <= 25) return '3.5vw';
    else return '5vw';
  };
  const getDigitOne = () => {
    if (actionType === SQRT) return `${SQRT}${digitOne}`;
    if (actionType === CBRT) return `${CBRT}${digitOne}`;
    if (actionType === QUIRE) return `${digitOne}²`;
    if (actionType === CUBE) return `${digitOne}³`;
    return `${digitOne}`;
  };
  const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
  return (
    <Dialog fullScreen open={isOpenAllResultModal} TransitionComponent={Transition}>
      <div className="multiplier-result-modal-background-img">
        <List>
          <Container maxWidth="lg">
            <div className="multiplier-result-modal-MinContainer">
              <div className="multiplier-result-modal-body">
                <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    {TWO_OPERAND.includes(actionType) &&
                                        <SymbolView number={actionType} fontSize={4}/>}
                  </Grid>
                  <Grid item>
                    <table className="container-input-number-multiplier">
                      <thead>

                      </thead>
                      <tbody>
                        <NumberView number={getDigitOne()} fontSize={5}/>
                        {TWO_OPERAND.includes(actionType) &&
                                            <NumberView number={`${digitTwo}`} fontSize={5}/>}
                      </tbody>
                    </table>
                  </Grid>
                </Grid>
                <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Typography variant="h5" component="h2"
                    style={{color: 'white', fontWeight: '600', userSelect: 'none'}}>
                    {intl('correctAnswer')}
                  </Typography>
                  <div className="multiplier-result-modal-paper"
                    style={{
                      color: isError ? 'red' : 'white',
                      fontSize: getSize(expect),
                      userSelect: 'none',
                    }}>
                    {`${expect}`}
                  </div>
                  <Typography variant="h5" component="h2"
                    style={{color: 'white', fontWeight: '600', userSelect: 'none'}}>
                    {intl('yourReplace')}
                  </Typography>
                  <div className="multiplier-result-modal-paper"
                    style={{
                      color: isError ? 'red' : 'white',
                      fontSize: getSize(currentAnswer),
                      userSelect: 'none',
                    }}>
                    {currentAnswer || 'NONE'}
                  </div>
                </Grid>
              </div>
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <Button
                  className="multiplier-games-result-modal-button"
                  component={AdapterLink}
                  style={{fontWeight: '700', color: '#1b1464', marginTop: '18px', fontSize: '22px'}}
                  to={'/games'}>
                  {intl('game')}
                </Button>
                <Button
                  className="multiplier-games-result-modal-button"
                  style={{fontWeight: '700', color: '#1b1464', marginTop: '18px', fontSize: '22px'}}
                  onClick={closeAllResultModal}>
                  {intl('close')}
                </Button>
              </Grid>
            </div>
          </Container>
        </List>
      </div>
    </Dialog>
  );
}

function NumberView({number, fontSize}) {
  return (<tr
    className="number-text-multiplier"
    style={{fontSize: `${fontSize}vw`}}>
    {`${number}`.split('').map((n, i) => (<td key={i} className="number-td-multiplier">
      {n}
    </td>))}
  </tr>);
}

function SymbolView({number, fontSize}) {
  return (<div
    className="number-symbol-multiplier"
    style={{fontSize: `${fontSize}vw`}}>
    {`${number}`}
  </div>);
}
