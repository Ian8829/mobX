import React, { Component } from 'react';
import observable from 'mobx';
import { observer } from 'mobx-react';
import ReactDOM from 'react-dom';

const appState = observable({
  count: 0
});

appState.increment = () => {
  this.count++;
};

appState.decrement = () => {
  this.count--;
};

@observer class Counter extends Component {
  render() {
    return(
      <div>
        Counter: {appState.count} <br/>
        <button onClick={this.handleDec}>-</button>
        <button onClick={this.handleInc}>-</button>
      </div>
    );
  }

  handleDec = () => {
    appState.increment();
  };

  handleInc = () => {
    appState.decrement();
  };
}

ReactDOM.render(
  <Counter store={appState}/>,
  document.querySelector('#root'));
