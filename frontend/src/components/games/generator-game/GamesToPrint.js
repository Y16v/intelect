import React from 'react';
import {COLUMN_NAMES} from './TableTasks';
import {intl} from '../../../routes/AppRoot';


export default class GamesToPrint extends React.Component {
  render() {
    return (
      <table id="for-xlsx">
        {this.props.digits.map((table, tableIndex) => {
          const tmpTable = table[0].map((col, i) => table.map((row) => row[i]));
          return (
            <tbody className="table-wrapper-asks">
              <tr>
                <td colSpan={COLUMN_NAMES.length} align="center">{`${intl('game.generatorGame.taskTable')}${tableIndex + 1}`}</td>
              </tr>
              <tr>
                {COLUMN_NAMES.filter((n, e) => e < table.length).map((name) => (
                  <th className="td-class">{name}</th>))}
              </tr>
              {tmpTable.map((column, columnIndex) => (
                <tr key={tableIndex}>
                  {column.map((digit) => (
                    <td
                      className="td-class"
                      key={`k${columnIndex}`}>
                      {digit}
                    </td>))}
                </tr>
              ))}
              <tr key={tableIndex}>
                {COLUMN_NAMES.filter((n, e) => e < table.length).map((name) => (
                  <td className="td-class-for-answer">{''}</td>))}
              </tr>
            </tbody>
          );
        })}
        {this.props.answers.map((digit, row) => (
          <tbody>
            <tr>
              <td colSpan={COLUMN_NAMES.length} align="center">{`${intl('game.generatorGame.taskTable')}${row + 1}`}</td>
            </tr>
            <tr key={row}>
              {digit.map((dig, col) => (
                <td className="td-class" key={`col${col}`}>
                  {dig}
                </td>))}
            </tr>
          </tbody>
        ))}

      </table>
    );
  }
}
