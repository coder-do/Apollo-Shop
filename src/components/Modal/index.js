import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from "../../redux/actions";
import CartElement from "../Cart/CartElement";
import "./style.sass";

class Modal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let totalPrice = 0;
        const { onClose, show, products, currency, onAdd } = this.props;
        let checkout_obj = [];
        if (products.length > 0) {
            products.map(el => {
                el.prices.map(price => {
                    if (currency === price.currency.symbol) {
                        totalPrice += price.amount * el.qtty;
                    }
                })
                const { name, brand, qtty, attributes } = el;
                checkout_obj = [
                    ...checkout_obj,
                    {
                        name, brand, qtty, attributes
                    }
                ]
            })
            totalPrice = totalPrice.toFixed(2);
            checkout_obj.push({ totalPrice })
        };

        console.log("CHECKOUT OBJECT", checkout_obj);
        return (
            <div className="overlay" onClick={onClose} style={{ display: show ? "block" : "none" }}>
                <div className="modal" style={{ opacity: show ? 1 : 0 }}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h4 className="modal-title">My Bag</h4>
                            <span>, {products.length} item{products.length > 1 && 's'}</span>
                        </div>
                        <div className="modal-body">
                            {products && products.map(product => {
                                return (
                                    <CartElement
                                        small
                                        onAdd={onAdd}
                                        key={(Math.random() + 1).toString(36).substring(7)}
                                        product={product}
                                        currency={currency}
                                    />
                                )
                            })}
                        </div>
                        <div className="modal-footer">
                            <div className="text__wrapper">
                                <h4>Total:</h4>
                                <p>{currency} {totalPrice}</p>
                            </div>
                            <div className="btn__wrapper">
                                <Link to='/cart'>
                                    <button onClick={onClose} className="view__btn">
                                        view bag
                                    </button>
                                </Link>
                                <button onClick={() => {
                                    window.alert('see console for checkout')
                                }} className="checkout__btn">
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

const mapStateToProps = state => {
    return {
        products: state.products,
        currency: state.currency
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAdd: (product, qtty = 0) => dispatch(addProduct(product, qtty))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);