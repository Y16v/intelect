import React, {useEffect} from 'react';
import Box from '@material-ui/core/Box';
import BoardNumber from '../common/BoardNumber';
import Keyboard from '../common/Keyboard';
import Button from '@material-ui/core/Button';
import {STEP_FOUR, STEP_ONE, STEP_THREE, STEP_TWO} from '../../../reducers/games/after_burner_game';
import {colors, useStyles} from './style';
import '../../../styles/Game.css';
import SettingsGameAfterburnerModal from '../../../containers/games/modals/GameAfterburnerModal';
import ResultModal from '../../../containers/games/modals/ResultModalContainer';
import ResultComponent from '../ResultComponent';
import {isAnswerEquals} from '../../../reducers/utils/game-results';
import {useSpeechSynthesis} from 'react-speech-kit';
import {LANGUAGE} from '../../../actions/language-local/language-local';
import {intl} from '../../../routes/AppRoot';

export const TEXT_DELAY = 1000;

function AfterburnerGame({isSubmitLoading, incrementTimer, actions, font, ...gameConfig}) {
  const classes = useStyles();
  const local = localStorage.getItem(LANGUAGE);
  const startDigits = local === 'ru' ? ['На старт!', 'Внимание!', 'Марш!'] : ['Ready!', 'Set!', 'Go!'];
  const {digits} = gameConfig;
  const isEqual = (answer, exact) => isAnswerEquals(answer, exact);
  const {speak} = useSpeechSynthesis();

  useEffect(() => {
    if (incrementTimer >= startDigits.length && gameConfig.step === STEP_ONE) {
      actions.stopTimerGame();
      actions.startDigits(gameConfig.speed * 1000);
    } else if (incrementTimer >= digits.length && gameConfig.step === STEP_TWO) {
      actions.stopTimerGame();
      actions.startAnswerStep();
    }
    if (gameConfig.step === STEP_ONE && incrementTimer < startDigits.length) {
      actions.countdownSound();
    }
    if (gameConfig.step >= STEP_TWO && gameConfig.step < STEP_THREE && incrementTimer < digits.length) {
      actions.digitSound(digits[incrementTimer], speak);
    }
    if (gameConfig.step === STEP_THREE) actions.stopTimerGame();
  }, [actions, digits, gameConfig, speak, startDigits, incrementTimer, gameConfig.step]);
  const onNext = () => {
    actions.onNext();
    actions.startGame(TEXT_DELAY);
  };

  function BeginButtons() {
    return (
      <Button
        aria-label="add"
        className={classes.buttonStart}
        onClick={(e) => actions.startGame(TEXT_DELAY)}
        classes={{
          root: classes.buttonRoot,
        }}>
        {intl('start')}
      </Button>
    );
  }

  function ResultText() {
    const {answer, exact, results} = gameConfig;
    return <ResultComponent
      open={gameConfig.step === STEP_FOUR && !gameConfig.isOpenModal}
      currentAnswer={answer}
      exactAnswer={exact}
      total={results.length}
      rightTotal={results.filter((res) => res.exact === res.answer).length}
      handleClose={onNext}
      onNext={onNext}
      onSubmitResult={() => actions.onSubmitResult(results)}
      onClickSettings={actions.openSettingsModal}
      isEqual={isEqual(gameConfig.answer, gameConfig.exact)}
      openAllResults={actions.openAllResultsModal}
      isSubmitLoading={isSubmitLoading}
    />;
  }

  return (
    <div className="root-game">
      <Box
        className={(gameConfig.step > 0 && gameConfig.step <= STEP_TWO) ? classes.rootBox : ''}
        display="flex"
        alignItems="center"
        justifyContent="center">
        <div className={classes.game}>
          {!gameConfig.isStarting && <BeginButtons/>}
          {gameConfig.step === STEP_ONE && <BoardNumber
            number={startDigits[incrementTimer]}
            color={colors[incrementTimer % colors.length]}
            actions={actions}
            font={font}
          />}
          {gameConfig.step === STEP_TWO && <BoardNumber
            number={digits[incrementTimer]}
            color={colors[incrementTimer % colors.length]}
            actions={actions}
            isDigit
            font={font}
          />}
          {gameConfig.step === STEP_THREE && <Keyboard
            onSubmit={actions.onSubmitAnswer}
            onChange={actions.onChangeAnswer}
          />}
        </div>
        <ResultText/>
        <SettingsGameAfterburnerModal/>
        <ResultModal/>
      </Box>
    </div>
  );
}

export default AfterburnerGame;
