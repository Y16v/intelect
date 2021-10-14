import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GameModalSetting from './GameModalSetting';
import Grid from '@material-ui/core/Grid';
import SelectOperations from '../common/SelectOperations';
import DigitMultipleSelect from '../common/DigitMultpleSelect';
import SelectTime from '../common/SelectTime';
import SelectNumber from '../common/SelectNumbers';
import AmountOfAction from '../common/AmountOfAction';
import Button from '@material-ui/core/Button';
import buttonYellow from '../../../styles/img/button-yellow.png';
import {Container} from '@material-ui/core';
import {Link} from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {intl} from '../../../routes/AppRoot';

const useStyles = makeStyles((theme) => ({
  button: {
    width: 200,
    fontSize: 24,
    color: '#1b1464',
    fontWeight: 700,
    background: `url(${buttonYellow}) center center no-repeat`,
    backgroundSize: 'cover',
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
    padding: '10px',
    marginTop: '28px',
  },
  formControlLabel: {
    'background': 'rgba(50,55,110,0.57)',
    'borderRadius': '30px',
    '& .MuiTypography-body1': {
      fontWeight: '700',
      FontSize: '1.2rem',
      paddingRight: '10px',
    },
  },
}));

export default function SettingsGameAfterburnerModal({
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
  const isVisibleVoiceCheckbox = gameConfig.countDigit < 4 && gameConfig.speed >= 2;

  const buttonDisables = () => {
    const {actionType, countDigit} = gameConfig;
    return actionType === '+/-' ? ACTION_COUNTS.filter((digit) => digit > countDigit) : [];
  };
  const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

  function centeredGrid() {
    return (
      <div>
        <Container maxWidth="md" className={classes.settingMinContainer}>
          <Grid container
            direction="row"
            justify="space-around"
            alignItems="center">
            {isVisibleVoiceCheckbox && <FormControlLabel
              style={{color: 'white'}}
              className={ classes.formControlLabel }
              control={
                <Checkbox
                  style={{color: 'white'}}
                  name="checkedB"
                  color="primary"
                  checked={gameConfig.isVoice}
                  onChange={(e) => actions.onChangeIsVoice(e.target.checked)}
                />
              }
              label={intl('game.modal.settingsGameAfterburnerModal.voiceGuidance')}
            />}

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
                  <SelectTime
                    defaultValue={gameConfig.speed}
                    onChange={actions.speedOnChange}
                  />
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
          <div className={classes.formControl}>
            <Button
              className={classes.button}
              component={AdapterLink} to={'/games'}>
              {intl('game')}
            </Button>
            <Button
              className={classes.button}
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
