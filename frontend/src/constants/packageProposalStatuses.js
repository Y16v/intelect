import {blue, green, grey, red} from '@material-ui/core/colors';

const newStatuses = {
  1: {
    code: 1,
    displayName: 'pending',
    color: blue[700],
  },
  2: {
    code: 2,
    displayName: 'canceled',
    color: grey[700],
  },
  3: {
    code: 3,
    displayName: 'rejected',
    color: red[700],
  },
  4: {
    code: 4,
    displayName: 'accepted',
    color: green[700],
  },
  _codes: {
    _pending: 1,
    _canceled: 2,
    _rejected: 3,
    _confirmed: 4,
  },
};
export default {
  ...newStatuses,
  _pending: newStatuses[1],
  _canceled: newStatuses[2],
  _rejected: newStatuses[3],
  _confirmed: newStatuses[4],
};
