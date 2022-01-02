import React, { Component } from 'react';

export default class CardsWrapper extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let justifyContent = 'unset';

        if (this.props.around) {
            justifyContent = 'space-around'
        } if (this.props.between) {
            justifyContent = 'space-between';
        }

        return (
            <div style={{
                display: 'flex', flexWrap: 'wrap',
                justifyContent: justifyContent,
            }}>
                {this.props.children}
            </div>
        )
    }
}