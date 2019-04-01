import React, { Component } from "react";

class Tabs extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleCheck = this.handleCheck.bind(this);
    this.state = {
      one: "",
      two: "",
      oneTab: this.props.oneTab,
      twoTab: this.props.twoTab,
      oneTabName: this.props.oneTabName,
      twoTabName: this.props.twoTabName,
      showOne: true,
      showTwo: false
    };
  }

  handleCheck(event) {
    if (event.currentTarget.dataset.id === "1") {
      this.setState({
        one: "one",
        two: "",
        showOne: true,
        showTwo: false
      });
    } else if (event.currentTarget.dataset.id === "2") {
      this.setState({
        one: "",
        two: "two",
        showOne: false,
        showTwo: true
      });
    }
  }

  render() {
    return (
      <div>
        <br />

        <hr/>
        <div id="tabsList" className="shadow-sm bg-white">
          <br />
          <hr />
          <ul>
            <li
              onClick={this.handleCheck.bind(this)}
              data-id="1"
              className={this.state.one}
            >
              <a>{this.state.oneTabName}</a>
            </li>
            <li
              onClick={this.handleCheck.bind(this)}
              data-id="2"
              className={this.state.two}
            >
              <a>{this.state.twoTabName}</a>
            </li>
            <hr className="bar" />
          </ul>
        </div>
        {this.state.showOne ? this.state.oneTab : null}
        {this.state.showTwo ? this.state.twoTab : null}
      </div>
    );
  }
}

export default Tabs;
