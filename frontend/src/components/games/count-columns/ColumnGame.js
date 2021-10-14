import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import InputButton from '../common/InputButton';
import {colors} from '../afterburner/style';
import TableFooter from '@material-ui/core/TableFooter';
import Button from '@material-ui/core/Button';
import btnImg from '../../../styles/img/button-yellow.png';
import {Link} from 'react-router-dom';
import {intl} from '../../../routes/AppRoot';


const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    borderRadius: 3,
    margin: 3,
    fontFamily: 'Roboto',
  },
  cell: {
    fontSize: 12,
  },
  input: {
    width: '100%',
  },
  button: {
    marginLeft: 5,
    height: '100%',
  },
  inputContainer: {
    width: '100%',
    padding: 5,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  expectCell: {
    fontSize: 20,
  },
  btn: {
    background: `url(${btnImg}) no-repeat center center transparent `,
    backgroundSize: 'cover',
    width: '150px',
    margin: '35px 12px',
    fontWeight: '700',
  },
  gpoupButtons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  MuiTableBodyRoot: {
    background: '#ffffff',
  },
  MuiTableCellRoot: {
    padding: 0,
  },
});

export default function ColumnGame({isSubmitLoading, digits, result, expect, actionCount, answerValue, spentTime, actions}) {
  const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
  const classes = useStyles();
  function getDigitFont(count) {
    if (count <= 5) return 40;
    else if (count === 9) return 12;
    else if (count === 10) return 11;
    else return (10 - count) * 7;
  }

  function answerHandle(e) {
    actions.answerHandle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    actions.verify();
  }

  const renderExpect = () => (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      className={classes.row}>
      <TableCell
        align='center'
        className={classes.expectCell}
        style={{backgroundColor: result ? '#82E0AA' : '#EC7063'}}>
        <Grid container className={classes.inputContainer}>
          <Grid item xs={6}>
            {expect}
          </Grid>
          <Grid item xs={6}>
            {spentTime} c.
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>);

  return (
    <div className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody className={classes.MuiTableBodyRoot}>
            {digits.map((number, index) => (
              <TableRow
                key={index}
                hover
                role="checkbox"
                tabIndex={-1}
                className={classes.row}>
                <TableCell
                  align='center'
                  className={classes.MuiTableCellRoot}
                  style={{
                    fontSize: getDigitFont(actionCount),
                    fontFamily: 'Roboto',
                    color: colors[index % actionCount],
                  }}>
                  {number}
                </TableCell>
              </TableRow>))}
            <TableRow
              hover
              role="checkbox"
              tabIndex={-1}
              className={classes.row}>
              <TableCell
                align='center'
                className={classes.cell}>
                <form className={classes.container} onSubmit={handleSubmit}>
                  <InputButton {...{
                    answerValue,
                    answerHandle,
                    expect,
                    classes,
                  }}/>
                </form>
              </TableCell>
            </TableRow>
            {expect !== null && renderExpect()}
          </TableBody>
          <TableFooter>
            <div className={classes.gpoupButtons}>
              <Button
                disabled={isSubmitLoading}
                component={AdapterLink}
                className={classes.btn}
                onClick={actions.onSubmitResult}
              >{intl('toComplete')}</Button>
              <Button onClick={actions.openSettingsModal} to={'/'} className={classes.btn}>{intl('settings')}</Button>
              <Button component={AdapterLink} to={'/games'} className={classes.btn}>{intl('game')}</Button>
            </div>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
