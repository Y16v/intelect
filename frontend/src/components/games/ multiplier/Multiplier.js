import React from 'react';
import BigButton from '../common/BigButton';
import '../../../styles/game-multiplier.css';
import {
  CBRT,
  CUBE,
  DIVIDE,
  MULTIPLY,
  QUIRE,
  SQRT,
  STEP_ONE,
  STEP_START,
  STEP_TWO,
} from '../../../interactors/multiplier/multiplier';
import Button from '@material-ui/core/Button';
import ResultModal from './ResultModal';
import SettingGamesOperationModal from '../../../containers/games/modals/SettingGameOperationModalContainer';
import Grid from '@material-ui/core/Grid';
import MultiplierResultModal from './MultiplierResultModal';
import {intl} from '../../../routes/AppRoot';


export default function Multiplier({isSubmitLoading, step, digits, actionType, actions, ...config}) {
  return (
    <div className="multiplier-root-container">
      <div className="root-game-multiplier">
        {step === STEP_ONE && <Answer
          actionType={actionType}
          digitOne={digits[0]}
          digitTwo={digits[1]}
          actions={actions}
          isRTL={config.isRTL}
        />}
        {step === STEP_START && <div className="multiplier-result-modal-bigButton"><BigButton onClick={actions.startGame}>
          {intl('start')}
        </BigButton> </div>}
        <ResultModal
          isSubmitLoading={isSubmitLoading}
          open={step === STEP_TWO}
          currentAnswer={config.answerValue}
          expect={config.expect}
          spentTime={config.spentTime}
          isError={config.isError}
          onFinish={actions.onFinish}
          onNext={actions.onNext}
          openSettings={actions.openSettings}
          openAllResultModal={actions.openAllResultModal}
        />
        <SettingGamesOperationModal modulesConfig={{includeZero: true}}/>
        <MultiplierResultModal
          digitOne={digits[0]}
          digitTwo={digits[1]}
          actionType={actionType}
          currentAnswer={config.answerValue}
          isError={config.isError}
          closeAllResultModal={actions.closeAllResultModal}
          isOpenAllResultModal={config.isOpenAllResultModal}
          expect={config.expect}
        />
      </div>
    </div>);
}

function Answer({digitOne, digitTwo, actionType, actions, isRTL}) {
  const TWO_OPERAND = [MULTIPLY, DIVIDE];
  const handleSubmit = (e) => {
    e.preventDefault();
    actions.onAnswer && actions.onAnswer();
  };
  const handleInput = (e) => {
    actions.onChangeAnswerInput && actions.onChangeAnswerInput(e.target.value);
  };

  const getDigitOne = () => {
    if (actionType === SQRT) return `${SQRT}${digitOne}`;
    if (actionType === CBRT) return `${CBRT}${digitOne}`;
    if (actionType === QUIRE) return `${digitOne}²`;
    if (actionType === CUBE) return `${digitOne}³`;
    return `${digitOne}`;
  };

  return (<div>
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="stretch">
      <Grid item>
        {TWO_OPERAND.includes(actionType) && <SymbolView number={actionType} fontSize={4}/>}
      </Grid>
      <Grid item>
        <table className="container-input-number-multiplier">
          <thead>

          </thead>
          <tbody>
            <NumberView number={getDigitOne()} fontSize={7.5}/>
            {TWO_OPERAND.includes(actionType) && <NumberView number={`${digitTwo}`} fontSize={7.5}/>}
          </tbody>
        </table>
      </Grid>
    </Grid>
    <form onSubmit={handleSubmit}>
      <input
        className="input-text-multiplier"
        dir={isRTL ? 'rtl' : 'ltr'}
        autoFocus type="number"
        onChange={handleInput}/>
      <div className="submit-button-multiplier">
        <Button
          onClick={actions.onAnswer}
          classes={{
            root: 'submit-button-multiplier-root',
            label: 'submit-button-multiplier-label',
          }}>
          {intl('toAnswer')}
        </Button>
      </div>
    </form>
  </div>);
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
