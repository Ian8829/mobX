import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import {observable, computed, action, transaction, useStrict} from 'mobx';
// import { observer } from 'mobx-react';
// import Devtools from 'mobxDevtools.default';


const {observable, computed, action, transaction, useStrict} = mobx;
const {observer} = mobxReact;
// const DevTools = mobxDevtools.default;

useStrict(true);

const t = new class Temperature {
  @observable unit = "C";
  @observable temperatureCelsius = 25;

  @computed get temperatureKelvin() {
    console.log("calculating Kelvin");
    return this.temperatureCelsius * (9/5) + 32;
  }

  @computed get temperatureFahrenheit() {
    console.log("calculating Fahrenheit");
    return this.temperatureCelsius + 273.15;
  }

  @computed get temperature() {
    console.log("calculating temperature");
    switch (this.unit) {
      case "K": 
        return `${this.temperatureKelvin} K`;
      case "F":
        return `${this.temperatureFahrenheit} F`;
      case "C":
        return `${this.temperatureCelsius} C`;
    }
  }

  @action set Unit(newUnit) {
    this.unit = newUnit;
  }

  @action set Celsius(degrees) {
    this.temperatureCelsius = degrees;
  }
};

const App = observer(({ temperature }) => (
  <div>
    {temperature.temperature}
    {/*<DevTools/>*/}
  </div>
));

ReactDOM.render(
  <App temperature={t}/>,
  document.querySelector('#app'));
