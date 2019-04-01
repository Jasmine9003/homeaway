import React, { Component } from "react";

class Tabs extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleCheck = this.handleCheck.bind(this);
    this.state = {
      one: "",
      two: "",
      three:"",
      oneTab: this.props.oneTab,
      twoTab: this.props.twoTab,
      threeTab: this.props.threeTab,
      oneTabName: this.props.oneTabName,
      twoTabName: this.props.twoTabName,
      threeTabName: this.props.threeTabName,
      showOne: true,
      showTwo: false,
      showThree: false
    };
  }

  handleCheck(event) {
    if (event.currentTarget.dataset.id === "1") {
      this.setState({
        one: "one",
        two: "",
        three: "",
        showOne: true,
        showTwo: false,
        showThree: false

      });
    } else if (event.currentTarget.dataset.id === "2") {
      this.setState({
        one: "",
        two: "two",
        three: "",

        showOne: false,
        showTwo: true,
        showThree: false

      });
    }else if (event.currentTarget.dataset.id === "3") {
      this.setState({
        one: "",
        two: "three",
        three: "",

        showOne: false,
        showTwo: false,
        showThree: true

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
            <li
              onClick={this.handleCheck.bind(this)}
              data-id="3"
              className={this.state.three}
            >
              <a>{this.state.threeTabName}</a>
            </li>
            <hr className="bar" />
          </ul>
        </div>
        {this.state.showOne ? this.state.oneTab : null}
        {this.state.showTwo ? this.state.twoTab : null}
        {this.state.showThree ? this.state.threeTab : null}

      </div>
    );
  }
}

export default Tabs;
