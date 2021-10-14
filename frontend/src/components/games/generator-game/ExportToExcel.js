import React from 'react';
import ReactExport from 'react-data-export';
import {intl} from '../../../routes/AppRoot';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


export default function ExportToExcel({digits, answers, actions}) {
  return (
    <div>
      <ExcelFile element={<button>{intl('game.generatorGame.downloadData')}</button>}>
        <ExcelSheet dataSet={multiDataSet} name="Organization"/>
      </ExcelFile>
    </div>
  );
}
