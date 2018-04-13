import React from 'react';

const Facility = (props) => {
  return (
    <div>
      <div><h2>{props.name}</h2></div>
      <div>{props.contact}</div>
    </div>
  );
};

export default Facility;