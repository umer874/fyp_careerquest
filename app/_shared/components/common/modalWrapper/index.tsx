"use client";
import React from "react";
import ReactDOM from "react-dom";
import styles from "./style.module.scss";

interface ModalWrapperProps {
  children: React.ReactNode;
}

export default class ModalWrapper extends React.Component<ModalWrapperProps> {
  private el: HTMLDivElement;

  constructor(props: ModalWrapperProps) {
    super(props);
    this.el = document.createElement("div");
    this.el.className = styles.modalDropContainer;
  }

  componentDidMount() {
    document.body.appendChild(this.el);
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
    document.body.style.overflow = "auto";
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
