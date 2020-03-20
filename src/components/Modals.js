import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { BookingContext } from './BookingContext';
import styled from 'styled-components';
import {SeatContext} from './SeatContext';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
  table: {
    width: `100%`,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


// ============= SIMPLE TABLE

export function SimpleTable({ Row, Seat, Price }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Row</TableCell>
            <TableCell>Seat</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{Row}</TableCell>
            <TableCell>{Seat}</TableCell>
            <TableCell>${Price}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
// ============= SNACK BAR

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function CustomizedSnackbars() {

  const {
    actions: { finishTransaction },
    state,
  } = React.useContext(BookingContext);
  
  return (
    <div>
      <Snackbar open={state.status === 'purchased'} autoHideDuration={4000} onClose={finishTransaction}>
        <Alert onClose={finishTransaction} severity="success">
          Your seats reservation is confirmed. Welcome aboard ! 
        </Alert>
      </Snackbar>
    </div>
  );
}

// ============= BASIC TEXT FIELD

export function BasicTextFields({ seatId, error }) {

  const [creditCard, setCreditCard] = React.useState('');
  const [expiration, setExpiration] = React.useState('');
  const {
    actions: { purchaseTicketRequest,
               purchaseTicketFailure, 
               purchaseTicketSuccess, },
    state,
  } = React.useContext(BookingContext);

  const {
    actions: { markSeatAsPurchased },
  } = React.useContext(SeatContext);

  const handlePurchase = () => {
    purchaseTicketRequest();
    fetch(`/api/book-seat`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seatId,
          creditCard,
          expiration
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          purchaseTicketSuccess();
          markSeatAsPurchased();
        } else {
          purchaseTicketFailure(data);
        }
      })
  }

  const classes = useStyles();
  return (
    <>
      <div>
        <div>
          <h4 style={{ paddingLeft: "15px" }}>Enter payment details</h4>
        </div>
        <div>
          <form style={{ paddingLeft: "5px" }}
            className={classes.root}
            noValidate
            autoComplete="off">
            <TextField
              style={{ width: "45%" }}
              id="outlined-basic"
              label="Credit card"
              variant="outlined"
              required
              value={creditCard}
              onChange={(event) => setCreditCard(event.target.value)}

            />
            <TextField
              style={{ width: "25%" }}
              id="outlined-basic"
              label="Expiration"
              variant="outlined"
              required
              value={expiration}
              onChange={(event) => setExpiration(event.target.value)}
            />
            <Button
              style={{ width: "20%", height: "56px" }}
              color="primary"
              variant="contained"
              onClick={() => handlePurchase()}>
              {state.status === 'awaiting-response' ? (<CircularProgress size={20} color="inherit" />) : ('Purchase')}
          </Button>
            <ErrorMessage>
              <p>{error}</p>
            </ErrorMessage>
          </form>
        </div>
      </div>
    </>
  );
}


const ErrorMessage = styled.div`
  width : 100%;
  color: red;
  font-weight: 200;
  font-size: .8em;

`