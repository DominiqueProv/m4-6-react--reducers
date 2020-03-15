import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { BookingContext } from './BookingContext';

const useStyles = makeStyles(theme => ({
  table: {
    width: `100%`,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

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



export function BasicTextFields({ seatId }) {
  console.log(seatId)

  const [creditCard, setCreditCard] = React.useState('');
  const [expiration, setExpiration] = React.useState('');
  const {
    actions: { purchaseTicketRequest, purchaseTicketFailure, purchaseTicketSuccess  },
  } = React.useContext(BookingContext);

  const handlePurchase = () => {

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
      .then(data => purchaseTicketRequest(data))

}



 const classes = useStyles();
  return (
    <>
      <div>
        <div>
          <h4 style={{ paddingLeft: "15px" }}>Enter payment details</h4>
        </div>
        <div>
          <form style={{ paddingLeft: "5px" }} className={classes.root} noValidate autoComplete="off">
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
              Purchase
          </Button>
          </form>
        </div>
      </div>
    </>
  );
}
