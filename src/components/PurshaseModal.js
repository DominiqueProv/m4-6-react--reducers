import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { BookingContext } from './BookingContext';
import {SimpleTable, BasicTextFields} from './Modals';


export default function FormDialog() {

  const {state, actions} = React.useContext(BookingContext);
  
  const handleClose = () => {
    actions.cancelBookingProcess();
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={state.selectedSeatId !== null} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Purchase ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You're purshasing 1 ticket for the price of ${state.price}
          </DialogContentText>
          <SimpleTable Row = {state.row}
                       Seat = {state.seat}
                       Price = {state.price}   
          />
        </DialogContent>
        <DialogActions>
        <BasicTextFields seatId = {state.selectedSeatId}/>
        </DialogActions>
      </Dialog>
    </div>
  );
}