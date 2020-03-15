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
        status: 'awaiting-response',
      };
    case 'purchase-ticket-failure':
      return {
        ...state,
        status: 'error',
      };
    case 'purchase-ticket-success':
      return {
        ...state,
        status: 'purchased',
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
      //will refer at this action.type in reducer
      type: 'cancel-booking-process',
      // ...data,
    });
  };

  const purchaseTicketRequest = () => {
    dispatch({
      //will refer at this action.type in reducer
      type: 'purchase-ticket-request',
      // ...data,
    });
  };

  const purchaseTicketFailure = () => {
    dispatch({
      //will refer at this action.type in reducer
      type: 'purchase-ticket-failure',
      // ...data,
    });
  };

  const purchaseTicketSuccess = () => {
    dispatch({
      //will refer at this action.type in reducer
      type: 'purchase-ticket-success',
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
          purchaseTicketSuccess

        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};