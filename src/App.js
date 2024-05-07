import React from "react";
import { Component } from "react";
import Table from "./components/table";
import Buttons from "./components/buttons";
import "@fontsource/poppins";
import "animate.css/animate.min.css";
import pic from "./components/webep/user-solid.svg";

class App extends Component {
  state = {};

  hello = () => {
    this.setState({});
  };

  render() {
    return (
      <div className="allwrap" id="allwrap">
        <Buttons />
      </div>
    );
  }
}
export default App;
// it was orginally written using javascript and i rewrote it with react and components
