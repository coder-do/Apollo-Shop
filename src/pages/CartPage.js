import React, { Component } from 'react';
import Cart from '../components/Cart';
import CartElement from '../components/Cart/CartElement';

export default class CartPage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const image = 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg';
        return (
            <Cart>
                <CartElement image={image} />
                <CartElement image={image} />
                <CartElement image={image} />
                <CartElement image={image} />
            </Cart>
        )
    }
}