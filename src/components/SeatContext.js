import React from 'react';
export const SeatContext = React.createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
  nullAction : 'reset'

};

function reducer(state, action) {
  // console.log(state);
  // console.log(action);
  switch (action.type) {
    case 'receive-seat-info-from-server':
      return {
        ...state,
        hasLoaded: true,
        seats: action.seats,
        numOfRows: action.numOfRows,
        seatsPerRow: action.seatsPerRow,
        nullAction : 'reset'

      };
    case 'mark-seat-as-purchased':
      return {
        ...state,
        nullAction: 'start'
      
      };
    default:
      throw new Error('Unrecognized action');
  }
};

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  
  const receiveSeatInfoFromServer = data => {
    dispatch({
      type: 'receive-seat-info-from-server',
      ...data,
    });
  };

  const markSeatAsPurchased = data => {
    dispatch({
      type: 'mark-seat-as-purchased',
      ...data,
    });
  };

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer,
          markSeatAsPurchased
        },
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};