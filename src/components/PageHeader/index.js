import React, { Component } from 'react';

export default class PageHeader extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <h1 style={{
                fontSize: '42px', lineHeight: '160%', color: '#1D1F22', fontWeight: 400,
                marginTop: "80px", marginBottom: "50px"
            }}>{this.props.children}</h1>
        )
    }
}