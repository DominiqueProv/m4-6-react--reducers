import React from 'react';
import ReactDOM from 'react-dom';
import { SeatProvider } from './components/SeatContext';
import App from './components/App';
import { TicketProvider } from './components/BookingContext';



const rootElement = document.getElementById('root');
ReactDOM.render(
  <TicketProvider>
    <SeatProvider>
      <App />
    </SeatProvider>
  </TicketProvider>,
  rootElement);