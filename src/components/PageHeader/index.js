import React, { Component } from 'react';
import './style.sass';

export default class PageHeader extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <h1 className='pageHeader'>{this.props.children}</h1>
        )
    }
}