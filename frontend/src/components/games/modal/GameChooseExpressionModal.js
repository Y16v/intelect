import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CardChooseExpression from '../common/CardChosseExpresion';
import '../../../styles/setting-operation.css';
import {intl} from '../../../routes/AppRoot';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPaper-root': {
      borderRadius: 100,
      backgroundColor: 'rgba(64,113,246,0.83)',
    },
  },
}));

export default function ChooseExpressionModal({isOpen, handleClose, onSelect}) {
  const classes = useStyles();
  return (
    <Dialog
      maxWidth="md"
      open={isOpen}
      onClose={handleClose}
      classes={{root: classes.root}}
    >
      <CardChooseExpression onSelect={onSelect}/>
      <DialogActions>
        <Button className="multiplier-games-expresion-modal-button"
          style={{margin: 'auto', color: 'white', fontWeight: 'bolder'}} onClick={handleClose}
          color="primary">
          {intl('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
