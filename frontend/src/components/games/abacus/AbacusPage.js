import React from 'react';

export default function AbacusPage({abacusState, number, actions}) {
  return (<div className="root-game">
    <table>
      <tbody className="abacus-table-tbody">
        {abacusState.map((row, rowIndex) => (<td key={rowIndex} className="abacus-table-column">
          <tr>
            <div className="abacus-table-element-number">
              {number.split('')[rowIndex]}
            </div>
          </tr>
          {row.map((column, columnIndex) => (<tr key={columnIndex}>
            {!!column ? <div className="abacus-table-chip"
              onClick={(e) => actions.onClickChip(rowIndex, columnIndex)}>
            </div> :
                        <div className={`abacus-table-element ${columnIndex === 1 ? 'abacus-table-down' : ''} ${columnIndex === 2 ? 'abacus-table-top' : ''}`}/>}
          </tr>))}
        </td>))}

      </tbody>
    </table>
  </div>);
}
