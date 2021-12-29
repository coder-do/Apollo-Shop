import React, { Component } from 'react';
import CartElement from './CartElement';

export default class Cart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <h1>Cart</h1>
                <CartElement />
            </>
        )
    }
}