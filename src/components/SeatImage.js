import React from 'react';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import seat from '../assets/seat-available.svg';
import { BookingContext } from './BookingContext';
import checkmark from '../assets/checkbtn.png';
import styled from 'styled-components';


export const SeatImage = (props) => {

  const { actions } = React.useContext(BookingContext)
  let data = { price: props.price, rowName: props.rowName, seatIndex: props.seatIndex }
  let seatColor = { filter: 'none' };
  let disabled = false;
  let checkId = `${props.rowName}-${props.seatIndex}`
  if (props.status) {
    seatColor = { filter: 'grayscale(100%)' };
    disabled = true;
  } 
  let checkmark = { display: 'none'}
  if (props.addCheckmark){
    checkmark = { display: 'block'}
  }

  return (
    <Tippy content={` Row ${props.rowName}, Seat ${props.seatIndex} - $${props.price}`}>
      <SeatButton disabled={disabled}
        onClick={() => actions.beginBookingProcess(data)}
        style={{ border: "none", backgroundColor: '#eee', outline: "none" }}
      >
        <Checkmark id={checkId} src={checkmark}  style={checkmark} alt='check' width="20px"/>
        <img src={seat} alt="seat" style={seatColor} width="100%" />
      </SeatButton>
    </Tippy>
  );
};


const Checkmark = styled.img`
position: absolute;
bottom: 0;
right: 0;
z-index: 1;
`

const SeatButton = styled.button`
position:relative;

`
