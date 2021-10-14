import React from 'react';
import Button from '@material-ui/core/Button';
import {ButtonGroup} from '@material-ui/core';
import '../../../styles/speedsettings.css';

export default function SpeedSettingNumber({value1, value2, onClick1, onClick2, defaultValue, dot}) {
  return (
    <div className="container">
      <h1>{(value1 !== null && value2 !== null) ? `${value1}${dot}${value2}` : defaultValue}</h1>
      <div className="box-div">
        <ButtonGroup className="buttonGroup">
          {[0, 1, 2, 3, 4].map((option) => (
            <Button
              variant="outlined"
              className="button"
              style={{background: option === value1 ? 'blue' : 'white'}}
              key={option} value={option}
              onClick={() => onClick1 && onClick1(option)}
            >{option}</Button>
          ))}
        </ButtonGroup><ButtonGroup>
          {[5, 6, 7, 8, 9].map((option) => (
            <Button
              variant="outlined"
              className="button"
              style={{background: option === value1 ? 'blue' : 'white'}}
              key={option} value={option}
              onClick={() => onClick1 && onClick1(option)}
            >{option}</Button>
          ))}
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup className="buttonGroup">
          {[0, 1, 2, 3, 4].map((option) => (
            <Button
              variant="outlined"
              className="button"
              style={{background: option === value2 ? 'blue' : 'white'}}
              key={option} value={option}
              onClick={() => onClick2 && onClick2(option)}
            >{option}</Button>
          ))}
        </ButtonGroup><ButtonGroup>
          {[5, 6, 7, 8, 9].map((option) => (
            <Button
              variant="outlined"
              style={{background: option === value2 ? 'blue' : 'white'}}
              className="button"
              key={option} value={option}
              onClick={() => onClick2 && onClick2(option)}
            >{option}</Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
}
