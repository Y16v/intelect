import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GameModalSetting from './GameModalSetting';
import Grid from '@material-ui/core/Grid';
import SelectOperations from '../common/SelectOperations';
import DigitMultipleSelect from '../common/DigitMultpleSelect';
import SelectNumber from '../common/SelectNumbers';
import AmountOfAction from '../common/AmountOfAction';
import Button from '@material-ui/core/Button';
import {Container} from '@material-ui/core';
import buttonYellow from '../../../styles/img/button-yellow.png';
import {Link} from 'react-router-dom';
import {intl} from '../../../routes/AppRoot';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '55px',
  },
  formControl: {
    margin: 'auto',
    textAlign: 'center',
  },
  settingMinContainer: {
    background: 'rgba(103,142,255,0.44)',
    borderRadius: 100,
    marginTop: '5px',
    backgroundSize: 'contain',
    padding: '27px 0',
  },
  groupButtons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '4px 0',
  },
  btn: {
    backgroundImage: `url(${buttonYellow})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '150px',
    fontWeight: '700',
  },
}));

export default function SettingsGameCountColumnModal({
  isOpen,
  actions,
  gameConfig,
  fontsOptions = [],
  font,
}) {
  const ACTION_COUNTS = [1, 2, 3, 4, 5, 6];
  const classes = useStyles();
  const isDisablePlus = () => !(gameConfig.actionType === '+' || gameConfig.actionType === '+/-');
  const isDisableMinus = () => !(gameConfig.actionType === '-' || gameConfig.actionType === '+/-');
  const isDisableSubmit = () => {
    const {modules, modulesMinus, actionType} = gameConfig;
    let res = false;
    if (actionType === '+/-' && (!modules.length || !modulesMinus.length)) {
      res = true;
    } else if (actionType === '+' && !modules.length) {
      res = true;
    } else if (actionType === '-' && !modulesMinus.length) {
      res = true;
    }
    return res;
  };

  const buttonDisables = () => {
    const {actionType, countDigit} = gameConfig;
    return actionType === '+/-' ? ACTION_COUNTS.filter((digit) => digit > countDigit) : [];
  };
  const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
  function centeredGrid() {
    return (
      <div className={classes.root}>
        <Container maxWidth="md" className={classes.settingMinContainer}>
          <Grid
            direction="row"
            justify="space-around"
            alignItems="center">
            <Grid container
              direction="row"
              justify="center"
              alignItems="center">
              <div>
                <Grid container
                  direction="column"
                  justify="center"
                  alignItems="flex-start">
                  <SelectOperations
                    onChange={actions.actionTypeOnChange}
                    defaultValue={gameConfig.actionType}/>
                  <DigitMultipleSelect
                    label={intl('game.generatorGame.settingModal.moduleP')}
                    onChange={actions.onChangeModules}
                    defaultValue={gameConfig.modules}
                    disabled={isDisablePlus()}
                  />
                  <DigitMultipleSelect
                    label={intl('game.generatorGame.settingModal.moduleM')}
                    onChange={actions.onChangeModulesMinus}
                    defaultValue={gameConfig.modulesMinus}
                    disabled={isDisableMinus()}/>
                </Grid>
              </div>
              <div>
                <Grid container
                  direction="column"
                  justify="center"
                  alignItems="flex-start">
                  <AmountOfAction
                    onChange={actions.onChangeActionCount}
                    defaultValue={gameConfig.actionCount}
                  />
                  <SelectNumber
                    label={intl('game.generatorGame.settingModal.numberOfDigitP')}
                    value={gameConfig.countDigit}
                    onChange={actions.onChangeDigitCount}
                    disabled={isDisablePlus()}
                  />
                  <SelectNumber
                    label={intl('game.generatorGame.settingModal.numberOfDigitM')}
                    onChange={actions.onChangeDigitCountMinus}
                    value={gameConfig.countDigitMinus}
                    disables={buttonDisables()}
                    disabled={isDisableMinus()}/>
                </Grid>
              </div>
            </Grid>
          </Grid>
          <div className={classes.groupButtons}>
            <Button component={AdapterLink} to={'/games'} className={classes.btn}>{intl('game')}</Button>
            <Button
              className={classes.btn}
              onClick={actions.applySettings}
              disabled={isDisableSubmit()}>
              {intl('apply')}
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <GameModalSetting
      open={isOpen}
      handleClose={actions.close}
      centeredGrid={centeredGrid}
      applySetting={actions.applySettings}
      submitDisabled={isDisableSubmit()}
      fontsOptions={fontsOptions}
      font={font}
      actions={actions}
    />
  );
}
