import React, { Component } from "react";
import "./style.sass";

export default class Modal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="overlay" onClick={this.props.onClose} style={{ display: this.props.show ? "block" : "none" }}>
                <div className="modal" style={{ opacity: this.props.show ? 1 : 0 }}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h4 className="modal-title">{this.props.title}</h4>
                        </div>
                        <div className="modal-body">{this.props.children}</div>
                        <div className="modal-footer">
                            <button onClick={this.props.onClose} className="button">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};