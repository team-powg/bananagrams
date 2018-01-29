// Id, Bool: occupied or not
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Square extends Component {
  render() {
    const fill = '#41eef4';
    const stroke = '#41eef4';

    console.log('props', this.props)
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
