import React from 'react';
import Facility from './Facility'

const FacilitiesList = (props) => {

  const facilities = props.facilities.map((facility) => {
    return (
      <Facility {...facility} deleteFacility={props.deleteFacility} key={facility.id}/>
    )
  })

  return (
    <div>
      <h1>Facilities</h1>

      {props.facilities.length > 0 ? facilities : null}
    </div>
  );
};

export default FacilitiesList;