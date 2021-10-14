import React, {useRef} from 'react';
import ReactToPrint from 'react-to-print';

import './../../../styles/GeneratorGame/BarNavigation.css';
import {Icon} from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import SettingsIcon from '@material-ui/icons/Settings';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import SettingsModal from '../../../containers/games/generator-game/SettingsModalContainer';
import TableTasks from './TableTasks';
import {Link} from 'react-router-dom';
import GamesToPrint from './GamesToPrint';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {intl} from '../../../routes/AppRoot';

export default function GeneratorGamePage({digits, answers, actions}) {
  const componentRef = useRef();
  return (
    <div>
      <div className="gener-bar-ul">
        <div className="gener-bar-logo" onClick={actions.openSettingsModal}>
          <Link style={{textDecoration: 'none'}} to={'/games'}>
            {intl('back')}
          </Link>
        </div>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="gener-bar-copy-button"
          table="for-xlsx"
          filename="tablexls"
          sheet="tablexls"
          buttonText={intl('game.generatorGame.downloadExcel')}
        />
        <ReactToPrint
          trigger={() => (
            <div className="gener-bar-copy-button">
              <Icon> <PrintIcon/></Icon> {intl('game.generatorGame.point')}
            </div>
          )}
          content={() => componentRef.current}
        />
        <div style={{display: 'none'}}>
          <GamesToPrint
            ref={componentRef}
            digits={digits}
            answers={answers}
          />
        </div>
        <div className="gener-bar-settings">
          <Icon onClick={actions.openSettingsModal}>
            <SettingsIcon/>
          </Icon>
        </div>
        <div className="gener-bar-settings">
          <Icon onClick={actions.replayGame}>
            <PlayCircleFilledWhiteIcon/>
          </Icon>
        </div>
      </div>
      <TableTasks digits={digits} answers={answers}/>
      <SettingsModal/>
    </div>
  );
}
