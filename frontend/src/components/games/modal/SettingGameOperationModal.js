import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CenterAllComponent from '../common/GameOperationCentrerAllComponent';
import {Container} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    background: 'rgba(103,142,255,0.44)',
    borderRadius: 100,
    padding: '40px 0',
    marginTop: 65,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SettingGamesOperationModal(props) {
  const classes = useStyles();
  const {actions, gameConfig, isOpen} = props;
  const isDisableSubmit = () => {
    const {modulesOne, modulesTwo} = gameConfig;
    if (!modulesOne.length || !modulesTwo.length) return true;
    if (modulesOne.length === 1 && modulesOne[0] === 0) return true;
    if (modulesTwo.length === 1 && modulesTwo[0] === 0) return true;
    return false;
  };

  return (
    <div>
      <Dialog fullScreen open={isOpen} onClose={actions.close} TransitionComponent={Transition}>
        <div className="settings-modal-root">
          <Container maxWidth="md">
            <div className={classes.paper}>
              <CenterAllComponent isDisableSubmit={isDisableSubmit()} {...props}/>
            </div>
          </Container>
        </div>
      </Dialog>
    </div>
  );
}
