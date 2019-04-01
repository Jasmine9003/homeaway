import React from "react";
import axios from "axios";

export default class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      val: "",
      numTyped: false,
      opTyped: true,
      equation: "",
      ans: "",
      showans: false
    };
  }

  clear = e => {
    this.setState({
      val: "",
      numTyped: false,
      opTyped: true,
      equation: "",
      ans: "",
      showans: false
    });
  };
  handleValueChange = e => {
    if (this.state.showans) {
      this.setState({
        val: "",
        numTyped: false,
        opTyped: true,
        equation: "",
        ans: "",
        showans: false
      });
    }
    if (e.target.value !== "") {
      this.setState({
        opTyped: false,
        numTyped: true,
        val: e.target.value
      });
    } else {
      this.setState({
        opTyped: true,
        numTyped: false,
        val: e.target.value
      });
    }
  };

  addNumber = e => {
    this.nameInput.focus();

    if (this.state.showans) {
      this.setState({
        opTyped: true,
        numTyped: false,
        equation: this.state.ans + " + ",
        val: "",
        showans: false
      });
    } else {
      if (this.state.numTyped) {
        this.setState({
          opTyped: true,
          numTyped: false,
          equation: this.state.equation + this.state.val + " + ",
          val: ""
        });
      } else {
        var x = this.state.equation;
        x = x.substring(0, x.length - 3);
        this.setState({
          opTyped: true,
          numTyped: false,
          equation: x + " + ",
          val: ""
        });
      }
    }
  };

  subtractNumber = e => {
    this.nameInput.focus();

    if (this.state.showans) {
      this.setState({
        opTyped: true,
        numTyped: false,
        equation: this.state.ans + " - ",
        val: "",
        showans: false
      });
    } else {
      if (this.state.numTyped) {
        this.setState({
          opTyped: true,
          numTyped: false,
          equation: this.state.equation + this.state.val + " - ",
          val: ""
        });
      } else {
        var x = this.state.equation;
        x = x.substring(0, x.length - 3);
        this.setState({
          opTyped: true,
          numTyped: false,
          equation: x + " - ",
          val: ""
        });
      }
    }
  };

  multiplyNumber = e => {
    this.nameInput.focus();

    if (this.state.showans) {
      this.setState({
        opTyped: true,
        numTyped: false,
        equation: this.state.ans + " * ",
        val: "",
        showans: false
      });
    } else {
      if (this.state.numTyped) {
        this.setState({
          opTyped: true,
          numTyped: false,
          equation: this.state.equation + this.state.val + " * ",
          val: ""
        });
      } else {
        var x = this.state.equation;
        x = x.substring(0, x.length - 3);
        this.setState({
          opTyped: true,
          numTyped: false,
          equation: x + " * ",
          val: ""
        });
      }
    }
  };

  divideNumber = e => {
    this.nameInput.focus();

    if (this.state.showans) {
      this.setState({
        opTyped: true,
        numTyped: false,
        equation: this.state.ans + " / ",
        val: "",
        showans: false
      });
    } else {
      if (this.state.numTyped) {
        this.setState({
          opTyped: true,
          numTyped: false,
          equation: this.state.equation + this.state.val + " / ",
          val: ""
        });
      } else {
        var x = this.state.equation;
        x = x.substring(0, x.length - 3);
        this.setState({
          opTyped: true,
          numTyped: false,
          equation: x + " / ",
          val: ""
        });
      }
    }
  };

  equalto = e => {
    this.nameInput.focus();

    e.preventDefault();

    if (this.state.opTyped) {
      console.log("Invalid Operation");
    } else {
      var fullEquation = this.state.equation + this.state.val;
      const data = {
        equation: fullEquation
      };
      axios.defaults.withCredentials = true;
      axios.post("http://localhost:3001/Calculator", data).then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            equation: fullEquation,
            ans: response.data,
            showans: true,
            val: ""
          });
        } else {
          this.setState({
            ans: "An Error Occoured"
          });
        }
      });
    }
  };

  componentDidMount() {
    this.nameInput.focus();
  }

  render() {
    return (
      <div className="container">
        <br />
        <br />
        <h3>Calculator</h3>
        <br />
        <br />

        <div className="row">
          <div className="col-6" />
          <div className="col-6 ">
            <h3
              className="float-right"
              style={{ visibility: this.state.showans ? "visible" : "hidden" }}
            >
              &nbsp;= {this.state.ans}
            </h3>{" "}
            <h3 className="float-right">
              {this.state.equation}
              {this.state.val}
            </h3>
          </div>
          <br />
          <br />
        </div>

        <div className="row">
          <input
            className="form-control form-control-lg text-right"
            type="number"
            value={this.state.val}
            ref={input => {
              this.nameInput = input;
            }}
            onChange={this.handleValueChange}
          />
          <br />
          <br />
          <br />
          <br />
        </div>

        <div className="row">
          <div className="container">
            <button
              type="button"
              onClick={this.addNumber}
              className="btn btn-primary btn-lg btn-block"
            >
              +
            </button>
            <button
              type="button"
              onClick={this.subtractNumber}
              className="btn btn-primary btn-lg btn-block"
            >
              -
            </button>
            <button
              type="button"
              onClick={this.multiplyNumber}
              className="btn btn-primary btn-lg btn-block"
            >
              *
            </button>
            <button
              type="button"
              onClick={this.divideNumber}
              className="btn btn-primary btn-lg btn-block"
            >
              /
            </button>
            <button
              onClick={this.equalto}
              type="button"
              className="btn btn-success btn-lg btn-block"
            >
              =
            </button>
            <button
              onClick={this.clear}
              type="button"
              className="btn btn-danger btn-lg btn-block"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    );
  }
}
