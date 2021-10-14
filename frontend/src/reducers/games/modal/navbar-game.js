import createReducer from '../../utils/base';

const INITIAL_STATE = {
  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  speeds: [0.1, 0.2, 0.3, 0.4, 0.5, 0.7, 1, 1.1, 1.2, 1.3, 1.5, 1.8, 2, 2.5, 2.8, 3, 3.5, 4, 5, 7, 10],
  actionCounts: [1, 2, 3, 4, 5, 7, 10, 15, 17, 20, 25, 30, 40, 50],
  operators: [{value: '+', name: 'Сложение'}, {value: '-', name: 'Вычитание'}, {
    value: '+/-',
    name: 'Сложение/Вычитание',
  }],
};

export default createReducer(
    {

    }, INITIAL_STATE);
