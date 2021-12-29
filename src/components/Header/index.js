import React, { Component } from 'react';
import CurrencyBlock from './CurrencyBlock';
import Logo from './Logo';
import Nav from './Nav';
import './style.sass';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='header'>
                <Nav />
                <Logo />
                <CurrencyBlock show={this.props.show} />
            </div>
        )
    }
}