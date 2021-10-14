import React, {useRef} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MomentUtils from '@date-io/moment';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';
import {Box} from '@material-ui/core';
import ReactToPrint from 'react-to-print';
import StudentResultPrint from '../teacher/StudentResultPrint';
import {intl} from '../../../routes/AppRoot';


export default function FormDialog({actions, lookUpStudent, resultsToPrint, studentId}) {
  const componentRef = useRef();
  const updateResultsToPrint = () => {
    actions.setIsReadyToPrint(false);
    actions.getStudentResultsInDateRange(studentId);
  };

  return (
    <Dialog open={resultsToPrint.isDialogOpen} onClose={() => actions.setDialogToPrint(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{intl('profile.card.printResultsDialog.printResult')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {intl('profile.card.printResultsDialog.text')}
        </DialogContentText>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            disableToolbar
            InputLabelProps={{shrink: true}}
            variant="inline"
            format="YYYY-MM-DD"
            margin="normal"
            id="startDate"
            label={intl('profile.card.printResultsDialog.startDate')}
            value={resultsToPrint.startDate}
            onChange={(value) => actions.setPrintResultsFormValue('startDate', value)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            InputLabelProps={{shrink: true}}
            variant="inline"
            format="YYYY-MM-DD"
            margin="normal"
            id="endDate"
            label={intl('profile.card.printResultsDialog.finishDate')}
            value={resultsToPrint.endDate}
            onChange={(value) => actions.setPrintResultsFormValue('endDate', value)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <Box/>
        <Typography color='primary'>{resultsToPrint.isDataReadyToPrint ? intl('profile.card.printResultsDialog.dataIsReadyToPrint'): ''}</Typography>
        <Typography color='error' variant='inherit'>{resultsToPrint.error}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => actions.setDialogToPrint(false)} color="secondary">
          {intl('profile.card.printResultsDialog.back')}
        </Button>
        <Button onClick={updateResultsToPrint} color="primary">
          {intl('profile.card.printResultsDialog.downloadResult')}
        </Button>
        <ReactToPrint
          trigger={() => (
            <Button disabled={!resultsToPrint.isDataReadyToPrint} color="primary">
              {intl('profile.card.printResultsDialog.printing')}
            </Button>
          )}
          content={() => componentRef.current}
        />
        <div style={{display: 'none'}}>
          <StudentResultPrint
            ref={componentRef}
            lookUpStudent={lookUpStudent}
            lookUpResults={resultsToPrint.data}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
}
