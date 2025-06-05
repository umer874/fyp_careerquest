"use client";
import React from "react";
import ReactDOM from "react-dom";
import styles from "./style.module.scss";

export default class ModalWrapper extends React.Component {
  constructor(props: any) {
    super(props);
    //@ts-error
    this.el = document.createElement("div");
    //@ts-error
    this.el.className = styles.modalDropContainer;
  }

  componentDidMount() {
    //@ts-error
    document.body.appendChild(this.el);
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    //@ts-error
    document.body.removeChild(this.el);
    document.body.style.overflow = "auto";
  }

  render() {
    //@ts-error
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
