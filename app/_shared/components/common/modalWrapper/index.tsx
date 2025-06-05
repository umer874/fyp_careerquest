"use client";
import React from "react";
import ReactDOM from "react-dom";
import styles from "./style.module.scss";

export default class ModalWrapper extends React.Component {
  constructor(props: any) {
    super(props);
    //@ts-ignore
    this.el = document.createElement("div");
    //@ts-ignore
    this.el.className = styles.modalDropContainer;
  }

  componentDidMount() {
    //@ts-ignore
    document.body.appendChild(this.el);
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    //@ts-ignore
    document.body.removeChild(this.el);
    document.body.style.overflow = "auto";
  }

  render() {
    //@ts-ignore
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
