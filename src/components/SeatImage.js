import React from 'react';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import seat from '../assets/seat-available.svg';
import { BookingContext } from './BookingContext';


export const SeatImage = (props) => {

  const { actions } = React.useContext(BookingContext)

  let data = {price: props.price, rowName: props.rowName, seatIndex: props.seatIndex }
  let seatColor = { filter: 'none' };
  let disabled = false;
  if (props.status === true) {
    seatColor = { filter: 'grayscale(100%)' };
    disabled = true;
  }
  return (
   
    <Tippy content={` Row ${props.rowName}, Seat ${props.seatIndex} - $${props.price}`}>
       <button disabled={disabled}
               onClick = {() => actions.beginBookingProcess(data)}
               style = {{border: "none", backgroundColor: '#eee', outline: "none"}}
       >
      <img src={seat} alt="seat" style={seatColor} width="100%"/>
       </button>
    </Tippy>
  );
};


