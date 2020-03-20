import React from 'react';
export const BookingContext = React.createContext();

const initialState = {
  status: 'idle',
  error: null,
  selectedSeatId: null,
  price: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'begin-booking-process':
      return {
        ...state,
        status: 'seat-selected',
        selectedSeatId: `${action.rowName}-${action.seatIndex}`,
        price: action.price,
        row: action.rowName,
        seat: action.seatIndex
      };
    case 'cancel-booking-process':
      return {
        ...state,
        status: 'idle',
        error: null,
        selectedSeatId: null,
        price: null,
      };
    case 'purchase-ticket-request':
      return {
        ...state,
        hasLoaded: true,
        status: 'awaiting-response',
      };
    case 'purchase-ticket-failure':
      return {
        ...state,
        status: 'error',
        error: action.message,

      };
    case 'purchase-ticket-success':
      return {
        ...state,
        status: 'purchased',
        error: null,
        selectedSeatId: null,
        price: null,
        addCheckmark: false,

      };
      case 'finish-transation':
      return {
        ...state,
        status: 'idle',
      };
    default:
      throw new Error('Unrecognized action');
  }
};

export const TicketProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const beginBookingProcess = data => {
    dispatch({
      //will refer at this action.type in reducer
      type: 'begin-booking-process',
      ...data,
    });
  };
  
  const cancelBookingProcess = () => {
    dispatch({
      type: 'cancel-booking-process',
      // ...data,
    });
  };

  const purchaseTicketRequest = () => {
    dispatch({
      type: 'purchase-ticket-request',
      // ...data,
    });
  };

  const purchaseTicketFailure = (data) => {
    dispatch({
      type: 'purchase-ticket-failure',
      ...data,
    });
  };

  const purchaseTicketSuccess = () => {
    dispatch({
      type: 'purchase-ticket-success',
      // ...data,
    });
  };

  const finishTransaction = () => {
    dispatch({
      type: 'finish-transation',
      // ...data,
    });
  };
  
  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
          cancelBookingProcess,
          purchaseTicketRequest,
          purchaseTicketFailure,
          purchaseTicketSuccess,
          finishTransaction
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};