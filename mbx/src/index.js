import {observable, computed, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// const DevTools = mobxDevTools.default;

class Temperature {
  id = Math.random();
  @observable unit = 'C';
  @observable temperatureCelsius = 25;
  @observable location = "Amsterdam, NL";

  constructor(location) {
    this.location = location;
  }

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
    switch(this.unit) {
      case "K": return this.temperatureKelvin + "ºK";
      case "F": return this.temperatureFahrenheit + "ºF";
      case "C": return this.temperatureCelsius + "ºC";
    }
  }

  @action setUnit(newUnit) {
    this.unit = newUnit;
  }

  @action setCelsius(degrees) {
    this.temperatureCelsius = degrees;
  }

  @action("update temperature and unit")
  setTemperatureAndUnit(degrees, unit) {
    this.setCelsius(degrees);
    this.setUnit(unit);
  }

  @action inc() {
    this.setCelsius(this.temperatureCelsius + 1);
  }
}

const App = observer(
  ["temperatures"],
  ({ temperatures }) => (
    <ul>
      <TemperatureInput />
      {temperatures.map(t =>
        <TView key={t.id} temperature={t} />
      )}
    </ul>
  )
);

@observer(["temperatures"])
class TemperatureInput extends Component {
  @observable input = "";

  render() {
    return(
      <li>
        Destination
        <input
          onChange={this.onChange}
          value={this.input}
        />
        <button onClick={this.onSubmit}>Add</button>
      </li>
    );
  }

  @action onChange = e => {
    this.input = e.target.value
  };

  @action onSubmit = () => {
    this.props.temperatures.push(
      new Temperature(this.input)
    );
    this.input = "";
  }
}

@observer class TView extends Component {
  render() {
    const t = this.props.temperature;
    return (
      <li onClick={this.onTemperatureClick}>
        {t.location}:
        {t.loading ? "loading..." : t.temperature}
      </li>
    );
  }

  @action onTemperatureClick = () => {
    this.props.temperature.inc();
  }
}

const temps = observable([]);

ReactDOM.render(
  <Provider temperatures={temps}>
    <App temperatures={temps} />
  </Provider>,
  document.querySelector('#root')
);