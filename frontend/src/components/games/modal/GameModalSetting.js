import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import '../../../styles/settings-modal.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GameModalSetting({open, handleClose, centeredGrid}) {
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{className: 'settings-modal-root'}}>
        <div style={{backgroundColor: 'rgba(255, 255, 255, 0)'}}>
          {centeredGrid && centeredGrid()}
        </div>
      </Dialog>
    </React.Fragment>
  );
};
