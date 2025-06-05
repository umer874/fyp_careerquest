"use client";
import React from "react";
import ReactDOM from "react-dom";

export default class GlobalWrapper extends React.Component {
  constructor(props: any) {
    super(props);
    //@ts-error
    this.el = document.createElement("div");
  }

  componentDidMount() {
    //@ts-error
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    //@ts-error
    document.body.removeChild(this.el);
  }

  render() {
    //@ts-error
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
