import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SelectOperations from '../common/SelectOperations';
import DigitMultipleSelect from '../common/DigitMultpleSelect';
import SelectNumber from '../common/SelectNumbers';
import AmountOfAction from '../common/AmountOfAction';
import Button from '@material-ui/core/Button';
import buttonYellow from '../../../styles/img/button-yellow.png';
import {Container} from '@material-ui/core';
import GameModalSetting from '../modal/GameModalSetting';
import SelectMultiplierModal from '../modal/SelectMultiplierModal';
import {Link} from 'react-router-dom';
import {intl} from '../../../routes/AppRoot';

const useStyles = makeStyles((theme) => ({
  buttonFormControl: {
    width: 210,
    fontSize: 24,
    color: '#1b1464',
    fontWeight: 'bolder',
    marginLeft: theme.spacing(1),
    backgroundImage: `url(${buttonYellow})`,
    backgroundSize: 'cover',
    textDecoration: 'none',
  },
  formControl: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  linkForm: {
    textDecoration: 'none',
  },
  settingMinContainer: {
    background: 'rgba(103,142,255,0.44)',
    borderRadius: 100,
    marginTop: '5px',
    padding: '5px',
  },
  button: {
    width: 200,
    fontSize: 18,
    background: `url(${buttonYellow})  center center no-repeat`,
    backgroundSize: 'contain',
    color: '#1b1464',
    fontWeight: '700',
    marginTop: 18,
  },
}));

export default function SettingsModal({
  isOpen,
  actions,
  gameConfig,
  fontsOptions,
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
  const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

  const buttonDisables = () => {
    const {actionType, countDigit} = gameConfig;
    return actionType === '+/-' ? ACTION_COUNTS.filter((digit) => digit > countDigit) : [];
  };

  function centeredGrid() {
    return (
      <div>
        <Container maxWidth="md" className={classes.settingMinContainer}>
          <Grid container
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
                  <SelectNumber
                    label={intl('game.generatorGame.settingModal.numberOfDigitP')}
                    value={gameConfig.countDigit}
                    onChange={actions.onChangeDigitCount}
                    disabled={isDisablePlus()}
                  />
                  <AmountOfAction
                    onChange={actions.onChangeTableCount}
                    defaultValue={gameConfig.tableCount}
                    label={intl('game.generatorGame.settingModal.numberOfTable')}
                  />
                </Grid>
              </div>
              <div>
                <Grid container
                  direction="column"
                  justify="center"
                  alignItems="flex-start">
                  <SelectMultiplierModal
                    onSelect={actions.onChangeColumnCount}
                    value={gameConfig.columnCount}
                    label={intl('game.generatorGame.settingModal.numberOfColumns')}
                    disabledButtons={[11, 12, 13, 14, 15]}
                  />
                  <DigitMultipleSelect
                    label={intl('game.generatorGame.settingModal.moduleM')}
                    onChange={actions.onChangeModulesMinus}
                    defaultValue={gameConfig.modulesMinus}
                    disabled={isDisableMinus()}/>
                  <SelectNumber
                    label={intl('game.generatorGame.settingModal.numberOfDigitM')}
                    onChange={actions.onChangeDigitCountMinus}
                    value={gameConfig.countDigitMinus}
                    disables={buttonDisables()}
                    disabled={isDisableMinus()}/>
                  <AmountOfAction
                    onChange={actions.onChangeActionCount}
                    defaultValue={gameConfig.actionCount}
                  />
                </Grid>
              </div>
            </Grid>
          </Grid>
          <div className={classes.formControl}>
            <Button
              className={classes.buttonFormControl} component={AdapterLink} to={'/games'}>
              {intl('game')}
            </Button>
            <Button
              className={classes.buttonFormControl}
              onClick={actions.applySettings}
              disabled={isDisableSubmit()}
            >
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
