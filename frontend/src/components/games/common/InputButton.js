import React, {useRef} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';


export default function InputButton({answerValue, answerHandle, expect, classes}) {
  const textInput = useRef(null);

  return (
    <Grid container className={classes.inputContainer}>
      <Grid item xs={10}>
        <TextField
          type="number"
          variant="outlined"
          className={classes.input}
          inputProps={{min: 0, style: {textAlign: 'center'}}}
          autoFocus
          value={answerValue}
          onChange={answerHandle}
          disabled={expect !== null}
          inputRef={textInput}
          id="mui-theme-provider-input"
        />
      </Grid>
      <Grid item xs={1}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={
            () => {
              setTimeout(() => {
                textInput.current.focus();
              }, 100);
            }}
          endIcon={<SendIcon/>}>{''}
        </Button>
      </Grid>
    </Grid>
  );
}
