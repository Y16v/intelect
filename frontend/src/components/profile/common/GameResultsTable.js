import {Dialog, TableBody, TableCell, TableContainer, TableHead} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import games from '../../../constants/games';
import React from 'react';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {CheckCircle, HighlightOff} from '@material-ui/icons';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {intl} from '../../../routes/AppRoot';


const weekdayColor = {
  0: '#616161',
  1: '#d32f2f',
  2: '#c2185b',
  3: '#512da8',
  4: '#1976d2',
  5: '#388e3c',
  6: '#5d4037',
};

const useStyles = makeStyles((theme) => ({
  resultItemsAppBar: {
    position: 'relative',
  },
  resultItemsTitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  notFoundGrid: {
    height: '75vh',
  },
  weekdayColumn: {
    backgroundColor: theme.palette.primary.dark,
    fontWeight: 'bolder',
    color: 'white',
    fontSize: '1.1rem',
  },
  tableContainer: {
    padding: theme.spacing(2),
  },
}));


export default function({results,
  showResultItems,
  openResultItemsDialog,
  closeResultItemsDialog,
  isLoading,
}) {
  const classes = useStyles();

  return (
    <div>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>{intl('profile.common.gameResultTable.dayTime')}</TableCell>
              <TableCell>{intl('profile.common.gameResultTable.game')}</TableCell>
              <TableCell>{intl('profile.common.gameResultTable.correctlyAnswered')}</TableCell>
              <TableCell>{intl('profile.common.gameResultTable.totalAmount')}</TableCell>
              <TableCell>{intl('profile.common.gameResultTable.pointsTotal')}</TableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
                        <TableBody>
                          <TableRow>
                            <TableCell align="center" colSpan={5}>
                              <CircularProgress size={64} style={{alignSelf: 'center'}}/>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                    ):
                        <TableBody>
                          {results.map((result) => (
                            <TableRow hover
                              onClick={() => openResultItemsDialog(result.payload)}
                              key={result.id}
                            >
                              <TableCell
                                className={classes.weekdayColumn}
                                style={{backgroundColor: weekdayColor[result.weekday]}}
                              >{result.weekday_name} - {result.date} / {result.submit_at_time}</TableCell>
                              <TableCell>{intl(games[result.game_id].name)}</TableCell>
                              <TableCell>{result.right_answers}</TableCell>
                              <TableCell>{result.total_tasks}</TableCell>
                              <TableCell>{result.total_points}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
          }
          <ResultItemsDrawer showResultItems={showResultItems}
            closeResultItemsDialog={closeResultItemsDialog}/>

        </Table>
      </TableContainer>
    </div>
  );
}


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function ResultItemsDrawer({showResultItems, closeResultItemsDialog}) {
  const classes = useStyles();

  return (
    <Dialog fullScreen
      open={showResultItems.open}
      onClose={closeResultItemsDialog}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.resultItemsAppBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={closeResultItemsDialog}>
            <CloseIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.resultItemsAppTitle}>
            {intl('profile.common.gameResultTable.moreAboutTheGame')}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.tableContainer}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>{intl('profile.common.gameResultTable.numberOfActions')}</TableCell>
                <TableCell>{intl('profile.common.gameResultTable.numberOfDigitsP')}</TableCell>
                <TableCell>{intl('profile.common.gameResultTable.numberOfDigitsM')}</TableCell>
                <TableCell>{intl('profile.common.gameResultTable.usedNumbersP')}</TableCell>
                <TableCell>{intl('profile.common.gameResultTable.usedNumbersM')}</TableCell>
                <TableCell>{intl('profile.common.gameResultTable.speed')}</TableCell>
                <TableCell>{intl('profile.common.gameResultTable.replied')}</TableCell>
                <TableCell>{intl('profile.common.gameResultTable.correctAnswer')}</TableCell>
                <TableCell/>
              </TableRow>
            </TableHead>
            <TableBody>
              {showResultItems.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.action_count}</TableCell>
                  <TableCell>{item.count_digits}</TableCell>
                  <TableCell>{item.count_digit_minus}</TableCell>
                  <TableCell>{item.modules}</TableCell>
                  <TableCell>{item.modules_minus}</TableCell>
                  <TableCell>{item.speed}</TableCell>
                  <TableCell >
                    <Typography color={item.exact === item.answer ? 'primary' : 'error'}>
                      {item.answer || intl('profile.card.superAdminProfile.empty')}
                    </Typography>
                  </TableCell>
                  <TableCell>{item.exact}</TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {item.exact === item.answer ? <CheckCircle color='primary'/> :
                                            <HighlightOff color='error'/>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Dialog>
  );
}
