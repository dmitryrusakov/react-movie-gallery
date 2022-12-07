import React, { Component } from 'react';

class Counter extends Component {
  state = {
    count: 0,
  };
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }
  decrement = () => {
    if (this.state.count === 0) {
      return;
    }
    this.setState({ count: this.state.count - 1 });
  }
  render() {
    return <div>
      <pre>Count: {this.state.count}</pre>
      <button onClick={this.decrement}>-</button>
      <button onClick={this.increment}>+</button>
    </div>
  }
}

export default Counter;
