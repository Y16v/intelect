import React from 'react';
import ChooseExpressionModal from '../modal/GameChooseExpressionModal';
import Grid from '@material-ui/core/Grid';
import DigitMultipleSelect from './DigitMultpleSelect';
import SelectMultiplierModal from '../modal/SelectMultiplierModal';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {CBRT, CUBE, QUIRE, SQRT} from '../../../interactors/multiplier/multiplier';
import yellowButton from '../../../styles/img/button-yellow.png';
import {Link} from 'react-router-dom';
import {isMobile} from 'react-device-detect';
import LinkMobileApp from '../../../containers/LinkMobileApp/LinkMobileAppContainer';
import {intl} from '../../../routes/AppRoot';


const useStyles = makeStyles((theme) => ({
  actionTypeButton: {
    backgroundImage: `url(${yellowButton}) `,
    backgroundSize: '100% 100%',
    color: '1b1464',
    align: 'center',
    fontWeight: '700',
    marginBottom: '20px',
  },
  button: {
    width: 200,
    fontSize: 18,
    background: `url(${yellowButton})  center center no-repeat`,
    backgroundSize: 'contain',
    color: '#1b1464',
    fontWeight: '700',
    marginTop: 18,
  },
  actionTypeGridItem: {
    display: 'flex',
    justifyContent: 'center',
  },
  formControl: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  rltCheckboxLabel: {
    color: '1b1464',
    fontWeight: 'bold',
    textAlign: 'center',
    height: '1.5rem',
    marginBottom: '1rem',
  },
  rltCheckbox: {
    width: '1.5rem',
    height: '1.5rem',
    marginTop: '0.5rem',
  },
  checkboxContainer: {
    'width': '20rem',
    'height': '2.5rem',
    'backgroundImage': `url(${yellowButton}) `,
    'backgroundSize': '100% 100%',
    'textAlign': 'center',
    '@media (max-width:470px)': {
      width: '70vw',
    },
  },
}));

export default function CenterAllComponent({isOpenChooseActionTypeModal,
  actions,
  gameConfig,
  operations,
  isDisableSubmit,
  modulesConfig={},
}) {
  const getSelectedOperations = () => operations.filter((operation) => operation.value === gameConfig.actionType)[0];
  const operation = getSelectedOperations().value;
  const isDisableCountTwo = () => (operation === QUIRE || operation === CUBE || operation === SQRT || operation === CBRT);
  const classes = useStyles();
  const BUTTONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const getDisabledDigitsOne = () => {
    if ([SQRT, CBRT].includes(gameConfig.actionType)) {
      return BUTTONS.filter((value) => value > 4);
    }
  };

  const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

  return (
    <div>
      { isMobile ? <LinkMobileApp /> : <div/>}
      <Grid container
        direction="row"
        justify="space-around"
        alignItems="center">
        <Grid item xs={8} xl={5} lg={5} className={classes.actionTypeGridItem}>
          <Button
            edge="center"
            size="large"
            className={classes.actionTypeButton}
            onClick={actions.openActionTypeModal}
          >
            {intl('chooseAnAction')} {intl(getSelectedOperations().name)}
          </Button>
        </Grid>
        <Grid item xs={8} xl={8} lg={8} className={classes.actionTypeGridItem}>
          <div className={classes.checkboxContainer}>
            <label className={classes.rltCheckboxLabel}>
              <input
                type="checkbox"
                className={classes.rltCheckbox}
                checked={gameConfig.isRTL}
                onChange={actions.onChangeRTL}
              />
              {intl('game.common.gameOperation.ltr')}
            </label>
          </div>
        </Grid>
        <Grid container
          direction="row"
          justify="center"
          alignItems="center">
          <div>
            <Grid container
              direction="column"
              justify="center"
              alignItems="flex-start">
              <ChooseExpressionModal
                isOpen={isOpenChooseActionTypeModal}
                handleClose={actions.handleCloseActionTypeModal}
                onSelect={actions.onSelectActionType}
              />
              <SelectMultiplierModal
                label={intl('game.common.gameOperationCenterAC.firstMultiplier')}
                value={gameConfig.digitCountOne}
                onSelect={actions.onSelectDigitCountOne}
                disabledButtons={getDisabledDigitsOne()}
              />
              <DigitMultipleSelect
                label={intl('game.generatorGame.multiplication.module')}
                defaultValue={gameConfig.modulesOne}
                onChange={actions.onChangeModulesOne}
                {...modulesConfig}
              />
            </Grid>
          </div>
          <div>
            <Grid container
              direction="column"
              justify="center"
              alignItems="flex-start">
              <SelectMultiplierModal
                label={intl('game.common.gameOperationCenterAC.twoMultiplier')}
                value={gameConfig.digitCountTwo}
                onSelect={actions.onSelectDigitCountTwo}
                disabledButtons={BUTTONS.filter((button) => button > gameConfig.digitCountOne)}
                disabled={isDisableCountTwo()}
              />
              <DigitMultipleSelect
                label={intl('game.generatorGame.multiplication.module')}
                disabled={isDisableCountTwo()}
                defaultValue={gameConfig.modulesTwo}
                onChange={actions.onChangeModulesTwo}
                {...modulesConfig}

              />
            </Grid>
          </div>
        </Grid>
      </Grid>
      <div className={classes.formControl}>
        <Button
          className={classes.button} component={AdapterLink} to={'/games'}>
          {intl('game')}
        </Button>
        <Button
          className={classes.button}
          onClick={actions.applySettings}
          disabled={isDisableSubmit}
        >
          {intl('apply')}
        </Button>
      </div>
    </div>
  );
};
