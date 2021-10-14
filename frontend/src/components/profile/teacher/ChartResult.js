import React from 'react';
import {Bar} from 'react-chartjs-2';
import {blue} from '@material-ui/core/colors';

const style = {
  width: '100%',
  backgroundColor: '#ffffff',
  borderRadius: 4,
  border: '1px solid #cccccc',
};

export default function ChartResult({points, dates}) {
  return (<div style={style}>
    {(!!points.length && !!dates.length) && <Bar data={{
      labels: dates,
      datasets: [
        {
          label: 'Point',
          data: points,
          backgroundColor: blue.A400,
        },
      ],
    }
    }/>}
  </div>);
}
