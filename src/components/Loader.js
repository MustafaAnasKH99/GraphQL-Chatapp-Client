import React, { Component } from 'react';
import { PulseLoader } from 'halogenium';

class Loading extends Component {
  render() {
    return (
      <PulseLoader color="#26A65B" size="16px" margin="4px"/>
    );
  }
}

export default Loading