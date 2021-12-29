import React, { Component } from 'react';
import Card from '../components/Card';

export default class TechPage extends Component {
    render() {
        return (
            <div className='container' style={{ padding: '0 27px' }}>
                <h1 style={{
                    fontSize: '42px', lineHeight: '160%', color: '#1D1F22', fontWeight: 400,
                    marginTop: "80px", marginBottom: "50px",


                }}>Tech</h1>

                <div style={{
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
                }}>
                    <Card isOutOfStock />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        )
    }
}