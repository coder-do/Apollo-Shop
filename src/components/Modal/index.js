import React, { Component } from "react";
import { Link } from "react-router-dom";
import CartElement from "../Cart/CartElement";
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
                            <h4 className="modal-title">My Bag</h4>
                            <span>, {2} items</span>
                        </div>
                        <div className="modal-body">
                            <CartElement small />
                            <CartElement small />
                            <CartElement small />
                        </div>
                        <div className="modal-footer">
                            <div className="text__wrapper">
                                <h4>Total:</h4>
                                <p>$ {100}</p>
                            </div>
                            <div className="btn__wrapper">
                                <Link to='/cart'>
                                    <button onClick={this.props.onClose} className="view__btn">
                                        view bag
                                    </button>
                                </Link>
                                <button onClick={() => console.log('Check out process...')} className="checkout__btn">
                                    checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};