import React from 'react';
import { SeatContext } from './SeatContext';
import GlobalStyles from './GlobalStyles';
import TicketWidget from './TicketWidget';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import StarRating from './Fa-Star';
import FormDialog from './PurshaseModal';



function App() {
  
  const {
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);
  React.useEffect(() => {
    fetch('api/seat-availability')
      .then(res => res.json())
      .then(data => receiveSeatInfoFromServer(data));
  }, []);

  return (
    <Router>
      <>
        <Switch>
          <Route exact path='/'>
            <TicketWidget />
            <FormDialog/>
          </Route>
          <Route exact path='/star'>
            <StarRating />
          </Route>
        </Switch>
          <GlobalStyles />
        </>
      </Router>
  );
}

export default App;