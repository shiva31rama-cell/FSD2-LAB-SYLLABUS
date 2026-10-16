import { Component } from 'react';

export default class ClassCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState((previous) => ({ count: previous.count + 1 }));
  };

  render() {
    return (
      <section>
        <h2>Class Component: {this.state.count}</h2>
        <button onClick={this.increment}>Increment</button>
      </section>
    );
  }
}
