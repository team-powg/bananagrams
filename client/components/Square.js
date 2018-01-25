// Id, Bool: occupied or not
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Square extends Component {
  static propTypes = {
    black: PropTypes.bool
  };

  render() {
    const { black } = this.props;
    const fill = black ? 'black' : 'white';
    const stroke = black ? 'white' : 'black';

    return (
      <div style={{
          backgroundColor: fill,
          color: stroke,
          width: '100%',
          height: '100%'
         }}>
          {this.props.children}
      </div>
    )
  }
}
