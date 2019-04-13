import React, { Component } from "react";
import header from "../images/header-img.jpg";

export default class Header extends Component {
  render() {
    return (
      <header>
        <img className="header-image" src={header} alt="" />
        <h1 className="header-title">Clouds and Co.</h1>
      </header>
    );
  }
}
