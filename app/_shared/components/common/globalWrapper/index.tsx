"use client";
import React from "react";
import ReactDOM from "react-dom";

export default class GlobalWrapper extends React.Component {
  constructor(props: any) {
    super(props);
    //@ts-ignore
    this.el = document.createElement("div");
  }

  componentDidMount() {
    //@ts-ignore
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    //@ts-ignore
    document.body.removeChild(this.el);
  }

  render() {
    //@ts-ignore
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
