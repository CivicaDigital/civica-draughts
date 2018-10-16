import React from 'react';

export const NameForm = props => (
  <form>
    <label htmlFor="nameForm">
      {props.label}
      <input
        id={props.myID}
        type="text"
        value={props.myID}
        onChange={props.onChange}
      />
    </label>
  </form>
);
