
import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";


//

const createArray = (length) => [...Array(length)];

export default function StarRating({ totalStars = 5 }) {
  const [selectedStars, setSelectedStars] = useState(0);
  return (
    <>
      {createArray(totalStars)
        .map((num, idx) => (
          <Star
            key={idx}
            selected={selectedStars > idx}
            onSelect={() => setSelectedStars(idx + 1)}
          />
        ))}
      <p>
        {selectedStars} of {totalStars} stars
      </p>
    </>
  );
}
// fakeFunction simply does notting, it just return whatever argument was sent to it.
// However, if we do not set a default function, and the onSelect property is not defined, 
// an error will occur when we click the FaStar component because the value 
// for onSelect must be a function.

const Star = ({ selected = false, onSelect = (fakeFunction) => fakeFunction }) => (
    <FaStar
      color={selected ? "red" : "grey"}
      onClick={onSelect} />
  );


