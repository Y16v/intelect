import React from 'react';
import './../../../styles/ExcelStyle/excel.css';
import {intl} from '../../../routes/AppRoot';

export const COLUMN_NAMES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

export default function TableTasks({digits, answers, actions}) {
  return (
    <React.Fragment>
      <table id="for-xlsx">
        {digits.map((table, tableIndex) => {
          const tmpTable = table[0].map((col, i) => table.map((row) => row[i]));
          return (
            <div key={tableIndex} className="table-wrapper-asks">
              <thead>
                <tr>
                  <td className="text-title-table border-left-right border-bottom"
                    colSpan="11">
                    {intl('game.generatorGame.taskTable')}:{tableIndex + 1}
                  </td>
                </tr>
                <tr>
                  <th className="td-class">№</th>
                  {COLUMN_NAMES.filter((n, e) => e < table.length).map((name) => (
                    <th key={name} className="td-class">{name}</th>))}
                </tr>
              </thead>
              <tbody>
                {tmpTable.map((column, y) => (
                  <tr key={y}>
                    <td key="0td" className="td-class">
                      {y + 1}
                    </td>
                    {column.map((digit, columnIndex) => (
                      <td className="td-class" key={`k${columnIndex}`}>
                        {digit}
                      </td>))}
                  </tr>
                ))}
                <tr>
                  <td className="td-class-for-answer">{''}</td>
                  {COLUMN_NAMES.filter((n, e) => e < table.length).map((name) => (
                    <td key={name} className="td-class-for-answer">{''}</td>))}
                </tr>
              </tbody>
            </div>
          );
        })}
        <TableAnswer answers={answers}/>
      </table>
    </React.Fragment>
  );
}

function TableAnswer({answers}) {
  return (
    <div className="table-wrapper-answers">
      {answers.map((digit, number) => (
        <div>
          <thead>
            <tr>
              <td className="text-title-table border-left-right border-bottom"
                colSpan="11">
                {intl('game.generatorGame.taskTable')}:{number + 1}
              </td>
            </tr>
            <tr>
              {COLUMN_NAMES.filter((n, e) => e < (answers[0] || []).length).map((name) => (
                <th key={name} className="td-class">{name}</th>))}
            </tr>
          </thead>
          <tbody>
            {digit.map((dig, col) => (
              <td className="td-class" key={`col${col}`}>
                {dig}
              </td>))}
          </tbody>
        </div>
      ))}
    </div>
  );
}
