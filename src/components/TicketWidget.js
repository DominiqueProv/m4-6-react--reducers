import React from 'react';
import styled from 'styled-components';
import { SeatContext } from './SeatContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SeatImage } from './SeatImage';
import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';



const TicketWidget = () => {

  const { state } = React.useContext(SeatContext)
  const numOfRows = state.numOfRows;
  const seatsPerRow = state.seatsPerRow;
  const hasLoaded = state.hasLoaded;
  const seats = state.seats;

  const showCircular = () => {
    if (!hasLoaded) {
      return (
        <LoaderWrapper>
          <CircularProgress style={{ width:"100px", height:"100px", }} />
        </LoaderWrapper>
      )
    }
  }

  return (
    <Wrapper>
      <div style={{ color:"#303F9F", padding:"50px 0 30px 0", textAlign:"center"}}>
        <h1>Seat Selector</h1>
        <p>Please choose your seat</p>
      </div>
      {showCircular()}
      <BlockWrapper>
      {range(numOfRows).map(rowIndex => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map(seatIndex => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
              const seat = seats[seatId];
              return (
                <SeatWrapper key={seatId}>
                  <SeatImage
                    rowName={rowName}
                    seatIndex={seatIndex + 1}
                    status={seat.isBooked}
                    price={seat.price}
                  />
                </SeatWrapper>
              );
            })}
          </Row>
        );
      })}
      </BlockWrapper>
    </Wrapper >
  );
};

const BlockWrapper = styled.div`
/* padding-left: 10px; */
`
const Wrapper = styled.div`
  background: #eee;
  /* border: 1px solid #ccc; */
  border-radius: 3px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    /* border-bottom: 1px solid #ddd; */
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
  color: #303F9F;
  /* line-height: 60px; */
  padding-left: 5px;
  font-size: 1.3vw;
  width: 80px;
  text-align: center;
`;

const SeatWrapper = styled.div`
  /* padding: 5px; */
`;

const LoaderWrapper = styled.div`
  margin: auto;
  position: absolute;
  top: 50px; left: 50px;
  bottom: 50px; right: 50px;
  /* background-color: rgba(255, 0, 0, 0.2); */
  color: #FFF;
  z-index:5;
  display:flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
`
export default TicketWidget;

