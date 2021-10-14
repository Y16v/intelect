import multiplication from '../styles/img/abrogotion.png';
import division from '../styles/img/devision.png';
import square from '../styles/img/square.png';
import cube from '../styles/img/cube.png';
import SquareRt from '../styles/img/square-root.png';
import CubicRt from '../styles/img/cube-root.png';
import {CBRT, CUBE, DIVIDE, MULTIPLY, QUIRE, SQRT} from './multiplier/multiplier';

export default [
  {
    id: 1,
    name: 'multiplication',
    icon: multiplication,
    background: '#833ab4',
    url: 'setting-operation',
    value: MULTIPLY,
    disabled: false,
  }, {
    id: 2,
    name: 'division',
    icon: division,
    background: '#ef90f4',
    url: 'setting-operation',
    value: DIVIDE,
    disabled: false,
  }, {
    id: 3,
    name: 'square',
    icon: square,
    background: '#b3b431',
    url: 'setting-operation',
    value: QUIRE,
    disabled: false,
  }, {
    id: 4,
    name: 'cube',
    icon: cube,
    background: '#89b484',
    url: 'setting-operation',
    value: CUBE,
    disabled: false,
  }, {
    id: 5,
    name: 'squareRoot',
    icon: SquareRt,
    background: '#b46a51',
    url: 'setting-operation',
    value: SQRT,
    disabled: false,
  }, {
    id: 6,
    name: 'cubicRoot',
    icon: CubicRt,
    background: '#b485a8',
    url: 'setting-operation',
    value: CBRT,
    disabled: false,
  },
];
