import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Divider from '@material-ui/core/Divider';
import '../../../styles/modal.css';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#FCF3CF',
    boxShadow: theme.shadows[5],
    width: '80%',
  },
  header: {
    margin: theme.spacing(2, 4, 3),
  },

  body: {
    margin: theme.spacing(2, 4, 3),
  },

  footer: {
    margin: theme.spacing(2, 4, 3),
  },

  divider: {
    backgroundColor: '#2471A3',
    height: 2,
  },
}));


export default function GameModal({open,
  handleClose,
  renderHeader,
  renderBody,
  renderFooter,
  frequentSettings,
  centeredGrid,
  selectModule,
  operationsSettings,
  additionalSettings,
  toggleButtonSizes,
}) {
  const classes = useStyles();
  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}>
        <div className="base-modal-settings">
          <div className={classes.header}>
            {renderHeader && renderHeader()}
          </div>
          <Divider component="div" variant='fullWidth' className={classes.divider}/>
          <div className={classes.body}>
            {renderBody && renderBody()}
          </div>
          <div>
            {centeredGrid && centeredGrid()}
            {frequentSettings && frequentSettings()}
            {selectModule && selectModule()}
            {toggleButtonSizes && toggleButtonSizes()}
            {operationsSettings && operationsSettings()}
            {additionalSettings && additionalSettings()}
          </div>
          {renderFooter && <Divider component="div" variant='fullWidth' className={classes.divider}/>}
          <div className={classes.footer}>
            {renderFooter && renderFooter()}
          </div >
        </div>
      </Modal>
    </div>
  );
}
