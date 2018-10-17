import React from 'react';

export const NameForm = props => (
  <form>
    <label htmlFor="nameForm">
      {props.label}
      <input
        id={props.label}
        type="text"
        value={props.myID}
        onChange={props.onChange}
        maxLength={10}
      />
    </label>
  </form>
);
