import './App.css';
import React from 'react';

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      result: "false",
      number: "",
      selection: null
    }
  }

  handleChange (event) {
    this.setState({
      number: event.target.value
    })
  }

  handleInputNumber () {
    // If the value entered by users are not integer, round it to the nearest integer.
    if (!Number.isInteger(this.state.number)) {
      this.setState((prevState) => {
        return {
          number: Math.round(prevState.number)
        }
      })
    }
    // If user enter negative values, replace it with 1.
    if (this.state.number < 0) {
      this.setState((prevState) => {
        return {
          number: 1
        }
      })
    }
  }

  handleSelect (event) {
    this.setState({selection: event.target.value}, async () => {
      var result;
      if (this.state.selection === "isPrime") {
        result = await this.isPrime();
      } else if (this.state.selection === "isFibonacci") {
        result = await this.isFibonacci();
      }
      this.setState({
        result: result
      })
    })
  }

  isPrime() {
    var number = this.state.number;
    var isPrime = true;
    for (var i = 2; i < number - 1; i ++) {
      if (number % i === 0) {
        isPrime = false;
      }
    }
    return isPrime;
  }

  isFibonacci () {
    //(5*n2 + 4) or (5*n2 – 4)
    var number = this.state.number;
    var isFibonacci = null;

    var isSquare = (number) => {
      var root = Math.sqrt(number);
      var result;
      if (Number.isInteger(root * root)) {
        result = true;
      } else {
        result = false;
      }
      return result;
    }

    if (isSquare(5 * number * number + 4) || isSquare(5 * number * number - 4)) {
      isFibonacci = true;
    } else {
      isFibonacci = false;
    }

    return isFibonacci;
  }

  render () {
    return (
      <div className="App">
        <div>
          <input id="number" name="number" type="text" onChange={this.handleChange.bind(this)} value={this.state.number} onMouseLeave={this.handleInputNumber.bind(this)}></input>
        </div>

        <div>
        <select id="selection" name="selection" onChange={this.handleSelect.bind(this)}>
          <option value="isPrime">isPrime</option>
          <option value="isFibonacci">isFibonacci</option>
        </select>
        </div>

        <div id="result">
          {this.state.result.toString()}
        </div>

      </div>
    );
  }
}

export default App;
