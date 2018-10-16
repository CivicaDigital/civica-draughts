import React from 'react';

export class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.myID };
  }

  render() {
    return (
      <form>
        <label htmlFor="nameForm">
          {this.props.label}
          <input
            id={this.props.myID}
            type="text"
            value={this.props.myID}
            onChange={this.props.onChange}
          />
        </label>
      </form>
    );
  }
}
